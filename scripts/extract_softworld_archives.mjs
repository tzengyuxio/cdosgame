#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  buildOutputName,
  linkedTargetsFromTopicMarkdown,
  nextSequenceStart,
  parseArchiveCatalogId,
  selectedImageEntries,
  naturalCompare,
} from "../src/lib/softworldArchive.js";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultArchiveRoot = "/Volumes/Personal/interests/懷舊圖書館/骨灰集散地";

function parseArgs(argv) {
  const args = {
    edition: "珍藏版",
    kind: "box-front",
    source: "boneash",
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg.startsWith("--")) {
      const key = arg.slice(2).replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`Missing value for ${arg}`);
      }
      args[key] = value;
      i += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  args.sourceDir ??= path.join(defaultArchiveRoot, args.edition);
  args.topic ??= path.join(repoRoot, "content", "topics", `軟體世界遊戲列表（${args.edition}）.md`);
  args.outputDir ??= path.join(repoRoot, "raw", "softworld", args.edition);

  return args;
}

function usage() {
  return `Usage:
  node scripts/extract_softworld_archives.mjs [options]

Options:
  --edition <name>       Soft-World edition name. Default: 珍藏版
  --source-dir <path>    Archive directory. Default: ${defaultArchiveRoot}/<edition>
  --topic <path>         Topic markdown file. Default: content/topics/軟體世界遊戲列表（<edition>）.md
  --output-dir <path>    Output directory. Default: raw/softworld/<edition>
  --kind <kind>          Media kind base name. Default: box-front
  --source <code>        Source code in output filename. Default: boneash
  --dry-run              Print planned outputs without writing files.
  --help                 Show this message.
`;
}

function archiveEntriesFrom7z(archivePath) {
  const listing = execFileSync("7z", ["l", "-slt", archivePath], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });

  const entries = [];
  let current = {};

  function flush() {
    if (!current.Path) return;
    if (current.Folder === "-") entries.push(current.Path);
    current = {};
  }

  for (const line of listing.split(/\r?\n/)) {
    if (line === "") {
      flush();
      continue;
    }
    const match = line.match(/^([^=]+) = (.*)$/);
    if (!match) continue;
    current[match[1].trim()] = match[2];
  }
  flush();

  return entries;
}

function recursiveFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...recursiveFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractWithUnar(archivePath, plannedOutputs, args) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "softworld-archive-"));
  try {
    execFileSync("unar", ["-q", "-f", "-o", tempDir, archivePath], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });

    const relativeImages = recursiveFiles(tempDir)
      .map((filePath) => ({
        relative: path.relative(tempDir, filePath),
        filePath,
      }))
      .filter(({ relative }) => selectedImageEntries([relative]).length === 1)
      .sort((a, b) => naturalCompare(a.relative, b.relative));

    const selected = selectedImageEntries(relativeImages.map(({ relative }) => relative));
    const byRelative = new Map(relativeImages.map((item) => [item.relative, item.filePath]));

    if (selected.length !== plannedOutputs.length) {
      throw new Error(
        `unar selected ${selected.length} images but planned ${plannedOutputs.length} outputs for ${path.basename(archivePath)}`,
      );
    }

    for (const [index, relative] of selected.entries()) {
      fs.copyFileSync(byRelative.get(relative), plannedOutputs[index].outputPath);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function writeArchiveOutputs(archivePath, selected, plannedOutputs, args) {
  if (args.dryRun) return { extractor: "dry-run" };

  try {
    for (const [index, member] of selected.entries()) {
      const result = spawnSync("7z", ["e", "-so", archivePath, member], {
        encoding: "buffer",
        maxBuffer: 256 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
      });
      if (result.status !== 0) {
        const message = result.stderr?.toString("utf8").trim() || `7z exited with ${result.status}`;
        throw new Error(message);
      }
      const data = result.stdout;
      fs.writeFileSync(plannedOutputs[index].outputPath, data);
    }
    return { extractor: "7z" };
  } catch (error) {
    extractWithUnar(archivePath, plannedOutputs, args);
    return { extractor: "unar", fallbackReason: String(error.stderr || error.message).trim() };
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }

  const topicMarkdown = fs.readFileSync(args.topic, "utf8");
  const targets = linkedTargetsFromTopicMarkdown(topicMarkdown, { keyWithPrefix: true });
  const archives = fs
    .readdirSync(args.sourceDir)
    .filter((name) => /\.(zip|rar)$/i.test(name))
    .sort(naturalCompare);

  if (!args.dryRun) fs.mkdirSync(args.outputDir, { recursive: true });

  const emittedByKey = new Map();
  const results = [];
  const errors = [];

  for (const archiveName of archives) {
    const archivePath = path.join(args.sourceDir, archiveName);
    const catalog = parseArchiveCatalogId(archiveName);
    if (!catalog) {
      errors.push({ archive: archiveName, error: "Cannot parse catalog prefix and number" });
      continue;
    }

    const target = targets.get(catalog.key);
    if (!target) {
      errors.push({ archive: archiveName, catalog: catalog.key, error: "No linked target in topic" });
      continue;
    }

    const entries = archiveEntriesFrom7z(archivePath);
    const selected = selectedImageEntries(entries);
    const start = nextSequenceStart(emittedByKey, catalog.key);
    const plannedOutputs = selected.map((member, index) => {
      const outputName = buildOutputName({
        target,
        kind: args.kind,
        source: args.source,
        catalogPrefix: catalog.prefix,
        number: catalog.number,
        sequence: start + index,
        memberPath: member,
      });
      return {
        member,
        outputName,
        outputPath: path.join(args.outputDir, outputName),
      };
    });

    let extraction = { extractor: "none" };
    if (plannedOutputs.length > 0) {
      extraction = writeArchiveOutputs(archivePath, selected, plannedOutputs, args);
    }

    emittedByKey.set(catalog.key, (emittedByKey.get(catalog.key) ?? 0) + selected.length);
    results.push({
      archive: archiveName,
      catalog: catalog.key,
      target,
      images: entries.filter((entry) => selectedImageEntries([entry]).length === 1).length,
      selected: selected.length,
      extractor: extraction.extractor,
      fallbackReason: extraction.fallbackReason,
      outputs: plannedOutputs.map((output) => output.outputName),
    });
  }

  console.log(JSON.stringify({
    edition: args.edition,
    sourceDir: args.sourceDir,
    outputDir: args.outputDir,
    dryRun: args.dryRun,
    archives: archives.length,
    processed: results.length,
    errors,
    emitted: results.reduce((sum, result) => sum + result.selected, 0),
    fallbackArchives: results
      .filter((result) => result.extractor === "unar")
      .map((result) => result.archive),
    duplicateCatalogs: [...emittedByKey.entries()]
      .filter(([, count]) => count > 5)
      .map(([catalog, count]) => ({ catalog, count })),
    sample: results.slice(0, 3),
  }, null, 2));

  if (errors.length > 0) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
