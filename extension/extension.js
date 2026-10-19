// NoName extension entry: Shenzhou Luchen, Huan Wen 4.2.
// Copyright (C) 2026 JinkeHu-dev
// SPDX-License-Identifier: GPL-3.0-only

import characters from "./src/characters/huanwen/character.js";
import skills from "./src/characters/huanwen/skill.js";
import translates from "./src/characters/huanwen/translate.js";
import dynamicTranslate from "./src/characters/huanwen/dynamicTranslate.js";

export const type = "extension";

export default {
  name: "神州陆沉",
  editable: false,
  connect: true,
  content() {},
  precontent() {},
  config: {},
  help: {},
  package: {
    intro: "神州陆沉·染紫鎏痕·桓温4.2源码版本。",
    author: "JinkeHu-dev",
    version: "4.2.0",
    character: {
      character: characters,
      characterTitle: { hwd_huanwen: "染紫鎏痕·4.2" },
      characterIntro: {
        hwd_huanwen: "染紫鎏痕·桓温：晋，3/3。版本4.2；遂宁、伏火、三伐、慎图。",
      },
      translate: translates,
      dynamicTranslate,
    },
    card: { card: {}, translate: {}, list: [] },
    skill: { skill: skills, translate: {} },
  },
  files: { character: [], card: [], skill: [], audio: [] },
};