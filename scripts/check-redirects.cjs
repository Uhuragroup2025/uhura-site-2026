// Comprueba que _redirects tenga exactamente las mismas reglas que
// PERMANENT_REDIRECTS en scripts/cloudflare-pages-worker.js. Pages aplica
// _redirects también cuando hay _worker.js, así que una regla de más o
// distinta allí cambia el comportamiento en producción.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const worker = fs.readFileSync(path.join(root, "scripts/cloudflare-pages-worker.js"), "utf8");
const start = worker.indexOf("const PERMANENT_REDIRECTS");
const block = worker.slice(start, worker.indexOf("]);", start));
const expected = [...block.matchAll(/\["(\/[^"]*)", "(\/[^"]*)"\]/g)].map((m) => `${m[1]} ${m[2]} 301`);
const actual = fs.readFileSync(path.join(root, "_redirects"), "utf8").split("\n").map((l) => l.trim()).filter(Boolean);

const missing = expected.filter((rule) => !actual.includes(rule));
const extra = actual.filter((rule) => !expected.includes(rule));
if (missing.length || extra.length) {
  console.error("_redirects no coincide con PERMANENT_REDIRECTS del Worker.");
  if (missing.length) console.error("Faltan:\n  " + missing.join("\n  "));
  if (extra.length) console.error("Sobran:\n  " + extra.join("\n  "));
  process.exit(2);
}
console.log(`_redirects OK (${actual.length} reglas).`);
