import path from "node:path";

const imageExts = new Set([".jpg", ".jpeg", ".png"]);
const collator = new Intl.Collator("zh-Hant", { numeric: true, sensitivity: "base" });

export function fullwidthToAsciiDigits(value) {
  return value.replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0));
}

export function naturalCompare(a, b) {
  return collator.compare(a, b);
}

export function linkedCatalogKey(catalogId) {
  const normalized = fullwidthToAsciiDigits(catalogId.trim());
  const match = normalized.match(/^(.+?)(\d+)$/);
  if (!match) return null;
  return `${match[1]}${match[2].padStart(3, "0")}`;
}

export function linkedTargetsFromTopicMarkdown(markdown, { keyWithPrefix = false } = {}) {
  const targets = new Map();

  for (const line of markdown.split(/\r?\n/)) {
    if (!line.startsWith("|")) continue;

    const cells = line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

    if (cells.length < 3) continue;

    const link = cells[2].match(/\[[^\]]+\]\(([^)]+)\)/);
    if (!link) continue;

    const catalogKey = linkedCatalogKey(cells[0]);
    if (!catalogKey) continue;

    const number = catalogKey.match(/(\d+)$/)?.[1];
    const key = keyWithPrefix ? catalogKey : number;
    const target = decodeURIComponent(
      link[1]
        .replace(/^\//, "")
        .replace(/^games\//, "")
        .replace(/^series\//, "series-"),
    );
    targets.set(key, target);
  }

  return targets;
}

export function parseArchiveCatalogId(archivePath) {
  const basename = path.basename(archivePath);
  const match = basename.match(/^(.+?)(\d{3})/);
  if (!match) return null;
  return {
    prefix: match[1],
    number: match[2],
    key: `${match[1]}${match[2]}`,
  };
}

export function parseArchiveNumber(archivePath, catalogPrefix = "珍") {
  const basename = path.basename(archivePath);
  const escapedPrefix = catalogPrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = basename.match(new RegExp(`^${escapedPrefix}(\\d{3})`));
  return match?.[1] ?? null;
}

export function isImageEntry(entryPath) {
  return imageExts.has(path.extname(entryPath).toLowerCase());
}

export function selectedImageEntries(entries) {
  const images = entries.filter(isImageEntry).sort(naturalCompare);
  return [...new Set([...images.slice(0, 3), ...images.slice(-2)])];
}

export function nextSequenceStart(emittedByNumber, number) {
  return (emittedByNumber.get(number) ?? 0) + 1;
}

export function normalizedImageExt(memberPath) {
  const ext = path.extname(memberPath).toLowerCase();
  return ext === ".jpeg" ? ".jpg" : ext;
}

export function buildOutputName({
  target,
  kind = "box-front",
  source = "boneash",
  catalogPrefix = "珍",
  number,
  sequence,
  memberPath,
}) {
  const paddedSequence = String(sequence).padStart(2, "0");
  return `${target}__${kind}-${paddedSequence}__${source}__${catalogPrefix}${number}${normalizedImageExt(memberPath)}`;
}
