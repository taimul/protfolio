// Prints /resume and /cv from the static export (out/) to PDF with Microsoft Edge.
// Run after `next build`:  npm run docs
import { spawn } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = join(root, "out");
const edge = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].find(existsSync);

if (!existsSync(out)) throw new Error("Run `next build` first: out/ was not found.");
if (!edge) throw new Error("Microsoft Edge was not found.");

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = [join(out, path), join(out, path + ".html"), join(out, path, "index.html")].find(
    (f) => existsSync(f) && statSync(f).isFile(),
  );
  if (!file) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file));
});
await new Promise((r) => server.listen(4180, r));

const jobs = [
  { route: "resume", file: "Taimul_Haque_Pathan_Resume_2026.pdf", pages: 1 },
  { route: "cv", file: "Taimul_Haque_Pathan_CV_2026.pdf", pages: 2 },
];

// Async on purpose: the local server above has to keep answering while Edge loads the page.
function printPdf(cmd, args) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: "ignore" });
    const timer = setTimeout(() => child.kill("SIGKILL"), 60000);
    child.on("exit", (status) => {
      clearTimeout(timer);
      resolve({ status, error: null });
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      resolve({ status: null, error });
    });
  });
}

const profile = mkdtempSync(join(tmpdir(), "portfolio-pdf-"));
let failed = false;
for (const { route, file, pages } of jobs) {
  const target = join(root, "public", file);
  rmSync(target, { force: true });
  const run = await printPdf(
    edge,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--user-data-dir=${profile}`,
      `--print-to-pdf=${target}`,
      `http://localhost:4180/${route}`,
    ],
  );
  if (!existsSync(target)) {
    console.log(`!! ${file}: Edge wrote nothing (status ${run.status}, ${run.error ?? "no error"})`);
    failed = true;
    continue;
  }
  const count = (readFileSync(target, "latin1").match(/\/Type\s*\/Page(?!s)/g) ?? []).length;
  copyFileSync(target, join(out, file));
  const ok = count === pages;
  failed ||= !ok;
  console.log(`${ok ? "ok " : "!! "} ${file}: ${count} page(s), expected ${pages}`);
}

server.close();
if (failed) process.exitCode = 1;
