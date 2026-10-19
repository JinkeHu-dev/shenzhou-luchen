// One-step allocation UI for Sanfa 2.0.
// Copyright (C) 2026 JinkeHu-dev
// SPDX-License-Identifier: GPL-3.0-only

import { get } from "noname";

export function validSanfaAllocation(moved, cards, maxGain) {
  if (!Array.isArray(moved) || moved.length !== 3 || !moved.every(Array.isArray)) return false;
  const flat = moved.flat();
  return moved[0].length <= maxGain
    && flat.length === cards.length
    && new Set(flat).size === cards.length
    && flat.every(card => cards.includes(card));
}

export async function arrangeSanfa(player, cards, maxGain) {
  const valid = moved => validSanfaAllocation(moved, cards, maxGain);
  const choice = player.chooseToMove({
    prompt: `三伐：获得至多${maxGain}张，其余置于牌堆顶或弃置（牌堆顶左侧为最上方）`,
    forced: true,
    allowChooseAll: false,
    list: [
      [`获得（0至${maxGain}张）`, []],
      ["牌堆顶（左侧为最上方）", cards.slice()],
      ["弃置", []],
    ],
    filterMove(from, to, moved) {
      return typeof to !== "number" || to !== 0 || from.parentElement?._link === 0 || moved[0].length < maxGain;
    },
    filterOk(moved) { return valid(moved); },
    processAI() {
      const sorted = cards.slice().sort((a, b) => get.value(b, player) - get.value(a, player));
      const gains = sorted.slice(0, maxGain);
      return [gains, sorted.slice(gains.length), []];
    },
  });
  // NoName currently normalizes object parameters in chooseToMove(), so these
  // validators are set again on the event after construction.
  choice.set("filterMove", (from, to, moved) => typeof to !== "number" || to !== 0
    || from.parentElement?._link === 0 || moved[0].length < maxGain);
  choice.set("filterOk", moved => valid(moved));
  const result = await choice.forResult();
  if (result?.bool && valid(result.moved)) {
    return { gains: result.moved[0], top: result.moved[1], discards: result.moved[2] };
  }
  // Forced choices transferred to AI or interrupted still receive a legal,
  // deterministic allocation so ordering cards never remain unresolved.
  return { gains: [], top: cards.slice(), discards: [] };
}
