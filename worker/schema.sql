CREATE TABLE IF NOT EXISTS participants (
  id           TEXT PRIMARY KEY,
  created_at   INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  user_agent   TEXT
);

CREATE TABLE IF NOT EXISTS decisions (
  participant_id TEXT NOT NULL,
  vignette_id    TEXT NOT NULL,
  kind           TEXT NOT NULL CHECK (kind IN ('accepted','override')),
  context        TEXT NOT NULL,
  justification  TEXT NOT NULL,
  tags           TEXT,
  reason         TEXT,
  ts             INTEGER NOT NULL,
  PRIMARY KEY (participant_id, vignette_id),
  FOREIGN KEY (participant_id) REFERENCES participants(id)
);

CREATE TABLE IF NOT EXISTS profiles (
  participant_id TEXT PRIMARY KEY,
  years          INTEGER NOT NULL,
  domain         TEXT NOT NULL,
  ai_exp         TEXT NOT NULL,
  updated_at     INTEGER NOT NULL,
  FOREIGN KEY (participant_id) REFERENCES participants(id)
);

CREATE INDEX IF NOT EXISTS idx_decisions_vignette ON decisions(vignette_id);
CREATE INDEX IF NOT EXISTS idx_decisions_kind ON decisions(kind);
