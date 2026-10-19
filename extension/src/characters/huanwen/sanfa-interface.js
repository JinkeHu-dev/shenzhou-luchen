// One-step allocation UI for Sanfa 4.0.
// Copyright (C) 2026 JinkeHu-dev
// SPDX-License-Identifier: GPL-3.0-only

import { get } from "noname";

export function validSanfaAllocation(moved, cards, maxBottom) {
  if (!Array.isArray(moved) || moved.length !== 3 || !moved.every(Array.isArray)) return false;
  const flat = moved.flat();
  return moved[0].length <= maxBottom
    && flat.length === cards.length
    && new Set(flat).size === cards.length
    && flat.every(card => cards.includes(card));
}

export async function arrangeSanfa(player, cards, maxBottom) {
  const valid = moved => validSanfaAllocation(moved, cards, maxBottom);
  const choice = player.chooseToMove({
    prompt: `三伐：将0至${maxBottom}张牌置于牌堆底，其余置于牌堆顶或弃置（各框左侧最先摸到）`,
    forced: true,
    allowChooseAll: false,
    list: [
      [`牌堆底（0至${maxBottom}张，左侧最先摸到）`, []],
      ["牌堆顶（左侧为最上方）", cards.slice()],
      ["弃置", []],
    ],
    filterMove(from, to, moved) {
      return typeof to !== "number" || to !== 0 || from.parentElement?._link === 0 || moved[0].length < maxBottom;
    },
    filterOk(moved) { return valid(moved); },
    processAI() {
      const sorted = cards.slice().sort((a, b) => get.value(b, player) - get.value(a, player));
      const bottom = sorted.slice(0, maxBottom);
      return [bottom, sorted.slice(bottom.length), []];
    },
  });
  // NoName currently normalizes object parameters in chooseToMove(), so these
  // validators are set again on the event after construction.
  choice.set("filterMove", (from, to, moved) => typeof to !== "number" || to !== 0
    || from.parentElement?._link === 0 || moved[0].length < maxBottom);
  choice.set("filterOk", moved => valid(moved));
  const result = await choice.forResult();
  if (result?.bool && valid(result.moved)) {
    return { bottom: result.moved[0], top: result.moved[1], discards: result.moved[2] };
  }
  // Forced choices transferred to AI or interrupted still receive a legal,
  // deterministic allocation so ordering cards never remain unresolved.
  return { bottom: [], top: cards.slice(), discards: [] };
}
