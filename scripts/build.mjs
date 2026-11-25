import { readFile, writeFile, rm } from "node:fs/promises";
import { build } from "vite";
import config from "../vite.config.mjs";

const output = new URL("../dist/index.html", import.meta.url);
const serverDirectory = new URL("../.prerender/", import.meta.url);
const placeholder = "<!-- bakery-content -->";

const options = { ...config, configFile: false };
await build(options);
try {
  await build({
    ...options,
    build: { ssr: "src/prerender.tsx", outDir: ".prerender", emptyOutDir: true },
  });
  const { render } = await import(new URL("prerender.js", serverDirectory));
  const html = await readFile(output, "utf8");
  if (!html.includes(placeholder)) throw new Error("Marcador da vitrine ausente.");
  await writeFile(output, html.replace(placeholder, () => render()));
} finally {
  await rm(serverDirectory, { recursive: true, force: true });
}
