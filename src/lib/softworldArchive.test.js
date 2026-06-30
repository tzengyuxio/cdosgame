import assert from "node:assert/strict";
import test from "node:test";

import {
  buildOutputName,
  linkedCatalogKey,
  linkedTargetsFromTopicMarkdown,
  parseArchiveCatalogId,
  nextSequenceStart,
  parseArchiveNumber,
  selectedImageEntries,
} from "./softworldArchive.js";

test("linkedTargetsFromTopicMarkdown maps game and series links by catalog number", () => {
  const markdown = [
    "| 編號 | 類別 | 中文名稱 | 英文名稱 | 備註 |",
    "|------|------|----------|----------|------|",
    "| 珍００１ | 冒險 | [紐約獵人者](/games/cdg-4564) | Manhunter |  |",
    "| 珍３０６ | 冒險 | [國王密使６合１光碟大補帖(CD版)](/series/%E5%9C%8B%E7%8E%8B%E5%AF%86%E4%BD%BF) | The King's Quest Collector's Edition |  |",
  ].join("\n");

  const targets = linkedTargetsFromTopicMarkdown(markdown);

  assert.equal(targets.get("001"), "cdg-4564");
  assert.equal(targets.get("306"), "series-國王密使");
});

test("linkedTargetsFromTopicMarkdown can key by normalized catalog prefix and number", () => {
  const markdown = [
    "| 平００１ | 冒險 | [黑神鍋](/games/cdg-0001) | The Black Cauldron |  |",
    "| 8平００１ | 益智 | [上海](/games/cdg-0002) | Shanghai |  |",
  ].join("\n");

  const targets = linkedTargetsFromTopicMarkdown(markdown, { keyWithPrefix: true });

  assert.equal(targets.get("平001"), "cdg-0001");
  assert.equal(targets.get("8平001"), "cdg-0002");
});

test("selectedImageEntries sorts naturally and returns first three plus last two images", () => {
  const entries = [
    "folder/page10.jpg",
    "folder/page02.png",
    "folder/readme.txt",
    "folder/page01.jpg",
    "folder/page03.jpeg",
    "folder/page11.jpg",
    "folder/page04.jpg",
  ];

  assert.deepEqual(selectedImageEntries(entries), [
    "folder/page01.jpg",
    "folder/page02.png",
    "folder/page03.jpeg",
    "folder/page10.jpg",
    "folder/page11.jpg",
  ]);
});

test("selectedImageEntries does not duplicate images when archive has fewer than five images", () => {
  assert.deepEqual(selectedImageEntries(["b.jpg", "a.jpg", "note.txt"]), ["a.jpg", "b.jpg"]);
});

test("buildOutputName uses sequenced box-front names and normalizes jpeg extension", () => {
  assert.equal(
    buildOutputName({
      target: "cdg-4176",
      kind: "box-front",
      source: "boneash",
      catalogPrefix: "珍",
      number: "051",
      sequence: 2,
      memberPath: "scan/Pic0002.jpeg",
    }),
    "cdg-4176__box-front-02__boneash__珍051.jpg",
  );
});

test("parseArchiveNumber reads catalog number from archive basename", () => {
  assert.equal(parseArchiveNumber("珍138-聖域傳說(單色版).rar"), "138");
  assert.equal(parseArchiveNumber("/tmp/珍306-國王密使6合1光碟大補帖.rar"), "306");
});

test("parseArchiveCatalogId reads simple and compound catalog prefixes", () => {
  assert.deepEqual(parseArchiveCatalogId("珍138-聖域傳說.rar"), {
    prefix: "珍",
    number: "138",
    key: "珍138",
  });
  assert.deepEqual(parseArchiveCatalogId("8平001-上海.rar"), {
    prefix: "8平",
    number: "001",
    key: "8平001",
  });
});

test("linkedCatalogKey normalizes full-width digits", () => {
  assert.equal(linkedCatalogKey("珍０５１"), "珍051");
  assert.equal(linkedCatalogKey("8平００１"), "8平001");
});

test("nextSequenceStart continues numbering for duplicate catalog numbers", () => {
  const emittedByNumber = new Map([["138", 5]]);

  assert.equal(nextSequenceStart(emittedByNumber, "138"), 6);
  assert.equal(nextSequenceStart(emittedByNumber, "151"), 1);
});
