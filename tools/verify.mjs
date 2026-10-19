import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, resolve } from "node:path";

const rootPath = fileURLToPath(new URL("../", import.meta.url));
const extensionPath = join(rootPath, "extension");
const version = readFileSync(join(rootPath, "VERSION"), "utf8").trim();
const packageJson = JSON.parse(readFileSync(join(rootPath, "package.json"), "utf8"));
const info = JSON.parse(readFileSync(join(extensionPath, "info.json"), "utf8"));
const characters = JSON.parse(readFileSync(join(rootPath, "characters.json"), "utf8"));

function filesUnder(directory, skipped = new Set()) {
  return readdirSync(directory).flatMap(name => {
    if (skipped.has(name)) return [];
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesUnder(path, skipped) : [path];
  });
}

if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error(`Invalid project VERSION: ${version}`);
if (packageJson.version !== version) throw new Error(`package.json is ${packageJson.version}; VERSION is ${version}`);
if (info.version !== version) throw new Error(`extension/info.json is ${info.version}; VERSION is ${version}`);
if (info.name !== "神州陆沉") throw new Error(`Unexpected extension name: ${info.name}`);
if (info.author !== "JinkeHu-dev") throw new Error(`Unexpected extension author: ${info.author}`);
if (!readFileSync(join(extensionPath, "extension.js"), "utf8").includes(`version: "${version}"`)) {
  throw new Error("extension/extension.js does not match project VERSION");
}

for (const [id, character] of Object.entries(characters)) {
  if (!/^\d+\.\d+\.\d+$/.test(character.implementationVersion)) {
    throw new Error(`${id}: invalid implementationVersion`);
  }
  for (const field of ["source", "documentation"]) {
    if (!existsSync(join(rootPath, character[field]))) throw new Error(`${id}: missing ${field} path`);
  }
}

for (const file of filesUnder(extensionPath).filter(path => path.endsWith(".js"))) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`${relative(rootPath, file)}:\n${result.stderr || result.stdout}`);
  const source = readFileSync(file, "utf8");
  if (!source.includes("Copyright (C) 2026 JinkeHu-dev")) {
    throw new Error(`${relative(rootPath, file)}: missing public copyright holder`);
  }
  for (const match of source.matchAll(/from\s+["'](\.[^"']+)["']/g)) {
    const imported = resolve(dirname(file), match[1]);
    if (!existsSync(imported)) throw new Error(`${relative(rootPath, file)}: missing import ${match[1]}`);
  }
}

const publicTextExtensions = new Set([".js", ".json", ".md", ".mjs", ".ps1", ".txt", ".yaml", ".yml"]);
const privateWorkingPhrases = [
  "5LiN5LiK5LygR2l0SHVi",
  "5YaZ57uZ5L2g55yL55qE",
  "57uZ5L2g55yL55qE",
  "6K+356Gu6K6k5ZCO5LiK5Lyg",
  "5b6F5L2g56Gu6K6k",
  "5Li76KaB6aOO6Zmp5oyJ5LyY5YWI57qn",
  "5LiN5pu/5Luj6ZKI5a+55YW35L2T6aG555uu55qE5rOV5b6L5oSP6KeB",
  "UkVBRE1F5ZCO57ut5L+u5pS55Lya5pi+56S6",
  "RnV0dXJlIFJFQURNRSBlZGl0cyByZW1haW4gdmlzaWJsZQ==",
  "SHVhbiBXZW4gY2hhcmFjdGVyLWRlc2lnbiBjb250cmlidXRvcnM=",
  "5qGT5rip6Ieq6K6+5q2m5bCG6K6+6K6h6ICF",
  "6K6h5YiS5qCH562+",
  "6L+Z5piv5oiR5Li644CK5LiJ5Zu95p2A44CL6K6+6K6h",
  "6aaW5L2N5YWs5byA5q2m5bCG",
  "5ZCO57ut5Y+v5Lul5Y+m6KGM5Y+R5biD6Z2i5ZCR546p5a6255qE5L2T6aqM54mI",
  "QSBzZXBhcmF0ZSBwbGF5ZXIgdHJpYWwgYnVpbGQgbWF5IGxhdGVy",
  "UkVBRE1F5L+u5pS55ZCM5qC35L+d55WZR2l05Y6G5Y+y",
  "UkVBRE1F44CB562W5YiS5Lmm5ZKM5rqQ56CB5L+u5pS56YO95YiG5Yir55WZ55eV",
  "R2l0SHVi55qE5paH5Lu25Y6G5Y+y5Y+v5Lul55u05o6l5q+U6L6D",
  "QWxsIG5vdGFibGUgcHVibGljIGNoYW5nZXMgdG8gdGhpcyBwcm9qZWN0IGFyZSBkb2N1bWVudGVkIGhlcmUu",
  "5pys5paH5Lu26K6w5b2V6Z2i5ZCR6K+76ICF55qE6YeN6KaB5YWs5byA5Y+Y5YyW",
  "VGhpcyBmaWxlIHJlY29yZHMgcHVibGljIHByb2plY3QgcmVsZWFzZXMu",
  "5pys5paH5Lu26K6w5b2V5pW05Liq5omp5bGV6aG555uu55qE5YWs5byA5Y+R5biD",
].map(value => Buffer.from(value, "base64").toString("utf8"));

for (const file of filesUnder(rootPath, new Set([".git", "dist", "node_modules"]))) {
  const extension = file.slice(file.lastIndexOf("."));
  if (!publicTextExtensions.has(extension) || file === fileURLToPath(import.meta.url)) continue;
  const source = readFileSync(file, "utf8");
  const phrase = privateWorkingPhrases.find(value => source.includes(value));
  if (phrase) throw new Error(`${relative(rootPath, file)}: private working language found: ${phrase}`);
}

for (const markdown of filesUnder(rootPath, new Set([".git", "dist", "node_modules"]))
  .filter(path => path.endsWith(".md"))) {
  const source = readFileSync(markdown, "utf8");
  for (const match of source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (!target || target.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
    const localTarget = decodeURIComponent(target.split(/[?#]/, 1)[0]);
    if (!existsSync(resolve(dirname(markdown), localTarget))) {
      throw new Error(`${relative(rootPath, markdown)}: missing local link ${target}`);
    }
  }
}

console.log(`Verified Shenzhou Luchen ${version} with ${Object.keys(characters).length} public character.`);
