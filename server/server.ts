import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { networkInterfaces } from "node:os";
import { extname, join, normalize, resolve } from "node:path";

const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 3000);
const publicDir = resolve(process.cwd(), "dist");

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolveFilePath(urlPath: string): string {
  const requestPath = urlPath === "/" ? "/index.html" : urlPath;
  const normalizedPath = normalize(requestPath).replace(/^[\\/]+/, "");
  return join(publicDir, normalizedPath);
}

function isInsidePublicDir(filePath: string): boolean {
  const relativePath = normalize(filePath).toLowerCase();
  return relativePath.startsWith(publicDir.toLowerCase());
}

function getReachableUrls(): string[] {
  if (host !== "0.0.0.0" && host !== "::") {
    return [`http://${host}:${port}`];
  }
  const interfaces = networkInterfaces();
  const urls = new Set<string>([`http://127.0.0.1:${port}`, `http://localhost:${port}`]);
  for (const entries of Object.values(interfaces)) {
    for (const entry of entries ?? []) {
      if (entry.family === "IPv4" && !entry.internal) {
        urls.add(`http://${entry.address}:${port}`);
      }
    }
  }
  return Array.from(urls);
}

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  let filePath = resolveFilePath(requestUrl.pathname);

  if (!isInsidePublicDir(filePath)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  // SPA fallback: unknown route -> serve index.html so client-side state stays intact.
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(publicDir, "index.html");
    if (!existsSync(filePath)) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }
  }

  const extension = extname(filePath).toLowerCase();
  const contentType = contentTypes[extension] ?? "application/octet-stream";
  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log("Server available at:");
  for (const url of getReachableUrls()) {
    console.log(`  ${url}`);
  }
});
