import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const sourcePath = resolve(root, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs");
const publicDir = resolve(root, "public");
const targetPath = resolve(publicDir, "pdf.worker.min.mjs");

async function copyPdfWorker() {
  await mkdir(publicDir, { recursive: true });
  await copyFile(sourcePath, targetPath);
  console.log("[postinstall] Copied pdf.worker.min.mjs to public/");
}

copyPdfWorker().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[postinstall] Failed to copy PDF worker: ${message}`);
  process.exit(1);
});
