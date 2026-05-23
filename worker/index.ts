export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_TEXT = 2000;
const MAX_TAGS = 32;

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(req);
    }
    const pid = req.headers.get("x-participant-id");
    if (!pid || !UUID_RE.test(pid)) {
      return json({ error: "missing or invalid participant id" }, 400);
    }
    try {
      await touchParticipant(env.DB, pid, req.headers.get("user-agent"));
      return await route(req, env, url, pid);
    } catch (err) {
      console.error(err);
      return json({ error: "server error" }, 500);
    }
  },
};

async function route(req: Request, env: Env, url: URL, pid: string): Promise<Response> {
  if (req.method === "GET" && url.pathname === "/api/state") {
    return getState(env.DB, pid);
  }
  const decisionMatch = url.pathname.match(/^\/api\/decisions\/([A-Za-z0-9_-]{1,64})$/);
  if (req.method === "PUT" && decisionMatch) {
    return putDecision(env.DB, pid, decisionMatch[1], req);
  }
  if (req.method === "PUT" && url.pathname === "/api/profile") {
    return putProfile(env.DB, pid, req);
  }
  return json({ error: "not found" }, 404);
}

async function touchParticipant(db: D1Database, pid: string, ua: string | null): Promise<void> {
  const now = Date.now();
  await db
    .prepare(
      `INSERT INTO participants (id, created_at, last_seen_at, user_agent)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET last_seen_at = excluded.last_seen_at`,
    )
    .bind(pid, now, now, (ua ?? "").slice(0, 500))
    .run();
}

async function getState(db: D1Database, pid: string): Promise<Response> {
  const [decisionsRes, profileRes] = await Promise.all([
    db
      .prepare(
        `SELECT vignette_id, kind, context, justification, tags, reason, ts
         FROM decisions WHERE participant_id = ?`,
      )
      .bind(pid)
      .all<{
        vignette_id: string;
        kind: "accepted" | "override";
        context: string;
        justification: string;
        tags: string | null;
        reason: string | null;
        ts: number;
      }>(),
    db
      .prepare(`SELECT years, domain, ai_exp FROM profiles WHERE participant_id = ?`)
      .bind(pid)
      .first<{ years: number; domain: string; ai_exp: string }>(),
  ]);

  const decisions: Record<string, unknown> = {};
  for (const row of decisionsRes.results ?? []) {
    if (row.kind === "accepted") {
      decisions[row.vignette_id] = {
        kind: "accepted",
        ts: row.ts,
        context: row.context,
        justification: row.justification,
      };
    } else {
      decisions[row.vignette_id] = {
        kind: "override",
        ts: row.ts,
        context: row.context,
        justification: row.justification,
        tags: row.tags ? (JSON.parse(row.tags) as string[]) : [],
        reason: row.reason ?? "",
      };
    }
  }

  const profile = profileRes
    ? { years: profileRes.years, domain: profileRes.domain, aiExp: profileRes.ai_exp }
    : null;

  return json({ decisions, profile });
}

async function putDecision(
  db: D1Database,
  pid: string,
  vid: string,
  req: Request,
): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid json" }, 400);
  }
  if (!isObject(body)) return json({ error: "invalid body" }, 400);

  const kind = body.kind;
  if (kind !== "accepted" && kind !== "override") {
    return json({ error: "invalid kind" }, 400);
  }
  const context = clampText(body.context);
  const justification = clampText(body.justification);
  if (context === null || justification === null) {
    return json({ error: "context and justification required" }, 400);
  }

  let tagsJson: string | null = null;
  let reason: string | null = null;
  if (kind === "override") {
    const tags = body.tags;
    if (!Array.isArray(tags) || tags.length > MAX_TAGS || !tags.every((t) => typeof t === "string" && t.length <= 64)) {
      return json({ error: "invalid tags" }, 400);
    }
    tagsJson = JSON.stringify(tags);
    reason = typeof body.reason === "string" ? body.reason.slice(0, MAX_TEXT) : "";
  }

  const ts = Date.now();
  await db
    .prepare(
      `INSERT INTO decisions (participant_id, vignette_id, kind, context, justification, tags, reason, ts)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(participant_id, vignette_id) DO UPDATE SET
         kind = excluded.kind,
         context = excluded.context,
         justification = excluded.justification,
         tags = excluded.tags,
         reason = excluded.reason,
         ts = excluded.ts`,
    )
    .bind(pid, vid, kind, context, justification, tagsJson, reason, ts)
    .run();

  return json({ ok: true, ts });
}

async function putProfile(db: D1Database, pid: string, req: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid json" }, 400);
  }
  if (!isObject(body)) return json({ error: "invalid body" }, 400);

  const years = Number(body.years);
  const domain = typeof body.domain === "string" ? body.domain.slice(0, 200) : "";
  const aiExp = typeof body.aiExp === "string" ? body.aiExp.slice(0, 200) : "";
  if (!Number.isFinite(years) || years < 0 || years > 80 || !domain || !aiExp) {
    return json({ error: "invalid profile" }, 400);
  }

  await db
    .prepare(
      `INSERT INTO profiles (participant_id, years, domain, ai_exp, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(participant_id) DO UPDATE SET
         years = excluded.years,
         domain = excluded.domain,
         ai_exp = excluded.ai_exp,
         updated_at = excluded.updated_at`,
    )
    .bind(pid, Math.round(years), domain, aiExp, Date.now())
    .run();

  return json({ ok: true });
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function clampText(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.slice(0, MAX_TEXT);
  return trimmed.length > 0 ? trimmed : null;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
