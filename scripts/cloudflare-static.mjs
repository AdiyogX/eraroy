import { access, writeFile } from "node:fs/promises";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist", "client");

await access(join(clientDir, "index.html"));
await writeFile(join(clientDir, "_redirects"), "/* /index.html 200\n");
await writeFile(
  join(clientDir, "_headers"),
  `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`,
);

console.log("Cloudflare Pages static routing files generated.");
