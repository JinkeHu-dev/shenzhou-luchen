// Dynamic text for Suining's Sanfa upgrade.
// Copyright (C) 2026 JinkeHu-dev
// SPDX-License-Identifier: GPL-3.0-only

import translate from "./translate.js";

export default {
  hwd_sanfa(player) {
    return player.storage.hwd_sanfa_upgraded === true
      ? translate.hwd_sanfa_info.replace("出牌阶段限一次", "出牌阶段限三次")
      : translate.hwd_sanfa_info;
  },
};
