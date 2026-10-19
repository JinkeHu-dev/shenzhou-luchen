// One-step allocation UI for Sanfa 4.2.
// Copyright (C) 2026 JinkeHu-dev
// SPDX-License-Identifier: GPL-3.0-only

import { get } from "noname";

export function validSanfaAllocation(moved, cards, maxTop = 2) {
  if (!Array.isArray(moved) || moved.length !== 3 || !moved.every(Array.isArray)) return false;
  const flat = moved.flat();
  return moved[0].length <= maxTop
    && flat.length === cards.length
    && new Set(flat).size === cards.length
    && flat.every(card => cards.includes(card));
}

export async function arrangeSanfa(player, cards, drawCount, maxTop = 2) {
  const valid = moved => validSanfaAllocation(moved, cards, maxTop);
  const choice = player.chooseToMove({
    prompt: `三伐：牌堆顶至多${maxTop}张，其余置入牌堆底或弃置（各框左侧最先摸到）`,
    forced: true,
    allowChooseAll: false,
    list: [
      [`牌堆顶（0至${maxTop}张，左侧为最上方）`, []],
      ["牌堆底（左侧最先摸到）", cards.slice()],
      ["弃置", []],
    ],
    filterMove(from, to, moved) {
      return typeof to !== "number" || to !== 0 || from.parentElement?._link === 0 || moved[0].length < maxTop;
    },
    filterOk(moved) { return valid(moved); },
    processAI() {
      const sorted = cards.slice().sort((a, b) => get.value(b, player) - get.value(a, player));
      const bottom = sorted.slice(0, Math.min(drawCount, sorted.length));
      return [sorted.slice(bottom.length, bottom.length + maxTop), bottom, sorted.slice(bottom.length + maxTop)];
    },
  });
  // NoName currently normalizes object parameters in chooseToMove(), so these
  // validators are set again on the event after construction.
  choice.set("filterMove", (from, to, moved) => typeof to !== "number" || to !== 0
    || from.parentElement?._link === 0 || moved[0].length < maxTop);
  choice.set("filterOk", moved => valid(moved));
  const result = await choice.forResult();
  if (result?.bool && valid(result.moved)) {
    return { top: result.moved[0], bottom: result.moved[1], discards: result.moved[2] };
  }
  // Forced choices transferred to AI or interrupted still receive a legal,
  // deterministic allocation so ordering cards never remain unresolved.
  return { top: cards.slice(0, maxTop), bottom: cards.slice(maxTop), discards: [] };
}
