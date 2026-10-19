// Huan Wen 4.2 rules helpers.
// Copyright (C) 2026 JinkeHu-dev
// SPDX-License-Identifier: GPL-3.0-only

import { game, get } from "noname";

export const CHENG_MARK = "hwd_cheng";

export function chengTargets(includeDead = false) {
  const players = includeDead ? game.players.concat(game.dead) : game.players.filter(player => player.isIn());
  return players.filter(player => player.hasMark(CHENG_MARK));
}

export function findResponseSource(event) {
  const visited = new Set();
  for (let cursor = event; cursor && !visited.has(cursor); cursor = cursor.parent) {
    visited.add(cursor);
    if (Array.isArray(cursor.respondTo) && cursor.respondTo[0]) return cursor.respondTo[0];
  }
  return null;
}

export function largestSuitMultiplicity(cards, suitOf = card => get.suit(card)) {
  const counts = new Map();
  for (const card of cards) {
    const suit = suitOf(card);
    counts.set(suit, (counts.get(suit) || 0) + 1);
  }
  return Math.max(0, ...counts.values());
}

export function stageDamage(player, phaseUse) {
  return player.getHistory("sourceDamage", event => event.getParent("phaseUse") === phaseUse)
    .reduce((sum, event) => sum + Math.max(0, event.num || 0), 0);
}
