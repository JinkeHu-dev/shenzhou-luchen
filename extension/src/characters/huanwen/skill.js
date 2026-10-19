// Huan Wen 3.0 skill implementation for NoName.
// Copyright (C) 2026 JinkeHu-dev
// SPDX-License-Identifier: GPL-3.0-only

import { game, ui, get } from "noname";
import { arrangeSanfa } from "./sanfa-interface.js";
import { CHENG_MARK, chengTargets, findResponseSource, largestSuitMultiplicity, stageDamage } from "./rules.js";

const SUINING = "hwd_suining";
const SANFA = "hwd_sanfa";
const PROGRESS = "hwd_suining_progress";
const RESOLVING = "hwd_suining_resolving";
const UPGRADED = "hwd_sanfa_upgraded";

function clearCheng(target) {
  if (!target) return;
  if (target.hasMark(CHENG_MARK)) target.removeMark(CHENG_MARK, target.countMark(CHENG_MARK), false);
  target.removeSkill(CHENG_MARK);
  delete target.storage.hwd_cheng_token;
  delete target.storage.hwd_cheng_owner;
  target.syncStorage("hwd_cheng_token");
  target.syncStorage("hwd_cheng_owner");
}

function chengDamage(player, target) {
  const progress = player.storage[PROGRESS];
  const token = target.storage.hwd_cheng_token || target.playerid;
  return progress?.token === token ? progress.amount : 0;
}

function recordChengDamage(player, target, num) {
  const token = target.storage.hwd_cheng_token || target.playerid;
  const amount = chengDamage(player, target) + Math.max(0, num || 0);
  player.storage[PROGRESS] = { token, amount };
  return amount;
}

async function completeSuining(player, target) {
  if (!player.hasSkill(SUINING) || player.storage[RESOLVING]) return;
  player.storage[RESOLVING] = true;
  game.log(player, "完成", "#g【遂宁】", "的条件");
  await player.gainMaxHp(1);
  await player.recoverTo(player.maxHp);
  player.storage[UPGRADED] = true;
  player.syncStorage(UPGRADED);
  game.log(player, "将", "#g【三伐】", "改为出牌阶段限三次");
  clearCheng(target);
  await player.removeSkills(SUINING);
}

const skills = {
  hwd_suining: {
    trigger: { player: ["useCard", "respond"] },
    filter(event, player) {
      return !player.storage[RESOLVING] && get.name(event.card) === "shan";
    },
    check(event, player) {
      const source = findResponseSource(event);
      return !source || get.attitude(player, source) <= 0;
    },
    group: ["hwd_suining_mark", "hwd_suining_damage", "hwd_suining_dying"],
    async content(event, trigger, player) {
      const source = findResponseSource(trigger);
      const result = await player.judge({
        judgestr: "遂宁",
        judge(card) {
          const color = get.color(card);
          if (color === "red") return source?.hasGainableCards(player, "he") ? 1 : 0;
          if (color === "black") return source && get.attitude(player, source) <= 0 ? 1 : -1;
          return 0;
        },
      }).forResult();
      if (!result || !player.isIn()) return;
      if (result.color === "red") {
        if (source?.isIn() && source.hasGainableCards(player, "he")) {
          await player.gainPlayerCard({ target: source, position: "he", forced: true });
        }
      } else if (result.color === "black" && source?.isIn()) {
        await source.damage({ num: 1, source: player });
      }
    },
    onremove(player) {
      for (const target of game.players.concat(game.dead)) {
        if (target.storage.hwd_cheng_owner === player.playerid) clearCheng(target);
      }
      delete player.storage[PROGRESS];
      delete player.storage[RESOLVING];
    },
    ai: { threaten: 1.6 },
    subSkill: {
      mark: {
        trigger: { global: "roundStart" },
        filter(event, player) {
          return !chengTargets().length
            && game.hasPlayer(target => target !== player && target.isIn() && get.distance(player, target) <= 1);
        },
        async cost(event, trigger, player) {
          event.result = await player.chooseTarget({
            prompt: "遂宁：令距离1以内的一名其他角色获得“成”标记",
            filterTarget(card, current, target) {
              return target !== current && target.isIn() && get.distance(current, target) <= 1;
            },
            ai(target) { return -get.attitude(get.player(), target); },
          }).forResult();
        },
        async content(event, trigger, player) {
          const target = event.targets?.[0];
          if (chengTargets().length || !target?.isIn() || target === player || get.distance(player, target) > 1) return;
          for (const stale of chengTargets(true)) if (!stale.isIn()) clearCheng(stale);
          target.storage.hwd_cheng_token = get.id();
          target.storage.hwd_cheng_owner = player.playerid;
          target.addSkill(CHENG_MARK);
          target.addMark(CHENG_MARK, 1);
          target.syncStorage("hwd_cheng_token");
          target.syncStorage("hwd_cheng_owner");
        },
      },
      damage: {
        trigger: { source: "damageSource" },
        forced: true,
        silent: true,
        filter(event, player) {
          return !player.storage[RESOLVING] && event.num > 0 && event.player.hasMark(CHENG_MARK);
        },
        async content(event, trigger, player) {
          const amount = recordChengDamage(player, trigger.player, trigger.num);
          player.syncStorage(PROGRESS);
          trigger.player.markSkill(CHENG_MARK);
          if (amount >= 3) await completeSuining(player, trigger.player);
        },
      },
      dying: {
        trigger: { global: "dying" },
        forced: true,
        priority: 10,
        skillAnimation: true,
        animationColor: "metal",
        filter(event, player) {
          return !player.storage[RESOLVING] && event.player.hasMark(CHENG_MARK);
        },
        async content(event, trigger, player) {
          await completeSuining(player, trigger.player);
        },
      },
    },
  },

  hwd_fuhuo: {
    group: ["hwd_fuhuo_shan", "hwd_fuhuo_huogong"],
    subSkill: {
      shan: {
        enable: ["chooseToUse", "chooseToRespond"],
        position: "hes",
        selectCard: 1,
        filterCard(card) { return get.type2(card) === "trick"; },
        viewAs: { name: "shan" },
        viewAsFilter(player) {
          return player.hasCards("hes", card => get.type2(card) === "trick");
        },
        prompt: "将一张锦囊牌当【闪】使用或打出",
        check(card) { return 1 / Math.max(0.1, get.value(card)); },
        hiddenCard(player, name) {
          return name === "shan" && player.hasCards("hes", card => get.type2(card) === "trick");
        },
        ai: {
          respondShan: true,
          skillTagFilter(player) {
            return player.hasCards("hes", card => get.type2(card) === "trick");
          },
        },
      },
      huogong: {
        enable: "phaseUse",
        usable: 1,
        position: "hes",
        selectCard: 2,
        complexCard: true,
        filterCard(card) {
          const type = get.type2(card);
          return ["trick", "basic"].includes(type)
            && (!ui.selected.cards.length || type !== get.type2(ui.selected.cards[0]));
        },
        viewAs: { name: "huogong" },
        viewAsFilter(player) {
          return player.hasCards("hes", card => get.type2(card) === "trick")
            && player.hasCards("hes", card => get.type2(card) === "basic");
        },
        prompt: "出牌阶段限一次，将一张锦囊牌和一张基本牌当【火攻】使用",
        check(card) { return 6 - get.value(card); },
        ai: {
          order: 4,
          result: {
            target(player, target) {
              return get.effect(target, { name: "huogong" }, player, target);
            },
          },
        },
      },
    },
  },

  hwd_sanfa: {
    enable: "phaseUse",
    usable(skill, player) { return player.storage[UPGRADED] === true ? 3 : 1; },
    position: "h",
    filter(event, player) { return player.countCards("h") > 0; },
    filterCard: true,
    selectCard: 1,
    discard: false,
    lose: false,
    delay: false,
    prompt: "用一张手牌交换牌堆底的一张牌，然后亮出牌堆顶三张牌",
    check(card) { return 6 - get.value(card); },
    async content(event, trigger, player) {
      const payment = event.cards?.[0];
      if (!payment || !player.getCards("h").includes(payment)) return;

      const exchanged = get.bottomCards(1);
      if (!exchanged.length) return;
      await game.cardsGotoOrdering(exchanged);
      await player.lose({ cards: [payment], position: ui.cardPile, visible: false });
      await player.gain({ cards: exchanged, animate: "draw" });

      const revealed = get.cards(3);
      if (!revealed.length || !player.isIn()) return;
      await game.cardsGotoOrdering(revealed);
      await player.showCards(revealed, "三伐：亮出牌堆顶的三张牌");
      const x = largestSuitMultiplicity(revealed);
      event.hwd_sanfa_x = x;
      game.log(player, "发动", "#g【三伐】", "，X为", x);

      const { gains, top, discards } = await arrangeSanfa(player, revealed, x);
      if (gains.length) await player.gain({ cards: gains, animate: "gain2" });
      if (top.length) {
        await game.cardsGotoPile(top.slice().reverse(), "insert");
        game.addCardKnower(top, player);
      }
      if (discards.length) await game.cardsDiscard(discards);
      if (!player.isIn()) return;

      if (x >= 2) {
        player.addTempSkill("hwd_sanfa_unlimited", { player: "phaseUseAfter" });
      }
      if (x === 3) {
        player.addTempSkill("hwd_sanfa_unrespondable", { player: "phaseUseAfter" });
        await player.gainMaxHp(1);
      }
    },
    ai: { order: 9, result: { player: 1 }, threaten: 1.8 },
    subSkill: {
      unlimited: {
        charlotte: true,
        mark: true,
        marktext: "伐",
        intro: { content: "此出牌阶段使用牌无次数限制。" },
        mod: { cardUsable() { return Infinity; } },
      },
      unrespondable: {
        charlotte: true,
        mark: true,
        marktext: "袭",
        intro: { content: "此出牌阶段使用的牌不可被响应。" },
        trigger: { player: "useCard1" },
        forced: true,
        silent: true,
        firstDo: true,
        filter(event, player) {
          return event.getParent("phaseUse")?.player === player;
        },
        async content(event, trigger) {
          trigger.directHit.addArray(game.players);
        },
      },
    },
  },

  hwd_shentu: {
    locked: true,
    forced: true,
    trigger: { player: "phaseUseEnd" },
    filter(event, player) {
      const used = player.getHistory("useSkill", record => record.skill === SANFA
        && record.event?.getParent("phaseUse") === event).length;
      return stageDamage(player, event) < used;
    },
    async content(event, trigger, player) {
      await player.loseMaxHp(1);
    },
  },

  hwd_cheng: {
    charlotte: true,
    marktext: "成",
    onremove: true,
    intro: {
      name: "成",
      content(storage, target) {
        const token = target.storage.hwd_cheng_token || target.playerid;
        const owner = game.players.find(player => player.hasSkill(SUINING)
          && player.storage[PROGRESS]?.token === token);
        const amount = owner?.storage[PROGRESS]?.amount || 0;
        return `拥有“成”标记。${owner ? `<br>${get.translation(owner)}：${amount}/3点伤害` : ""}`;
      },
    },
  },
};

export default skills;
