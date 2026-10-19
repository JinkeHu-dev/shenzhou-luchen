# Changelog / 版本记录

## [4.2.0] - 2026-10-13

- Finalized the current design: top-deck exchange, at most two revealed cards returned to the top, remaining cards sent to the bottom or discard, then X cards drawn from the bottom.
- Added the one-dialog Sanfa allocation interface and explicit top/bottom order handling.
- Added event-history accounting for Shentu and token-bound Cheng progress for Suining.
- Added bilingual documentation, licensing notices, and implementation notes.
- Added the publishable repository layout, version manifest, milestone index, validation workflow, and release-packaging tool.

- 确立现行设计：交换牌堆顶；亮牌至多两张置顶；其余置底或弃置；再从牌堆底摸X张。
- 加入三伐三框一次确认界面，并明确牌堆顶、牌堆底的顺序。
- 遂宁使用标记令牌绑定累计进度；慎图按当前出牌阶段的事件记录结算。
- 加入中英双语说明、版权声明和代码实现章节。
- 加入正式目录结构、版本清单、逐版索引、自动校验和发布包构建工具。

## [4.1.0]

- Required 1 to X revealed cards to be placed on the bottom before drawing X.
- 修复三张同花整组留顶的循环，但限制了牌堆底存牌。

## [4.0.0]

- Introduced bottom-deck storage and bottom drawing.
- 引入“置入牌堆底，再从牌堆底摸X张”的结构。

## [3.0.0]

- Removed the special hand-limit exemption from cards obtained through Sanfa.
- 删除三伐所得牌不计入手牌上限的规则。

## [2.0.0]

- Changed Suining's black result to direct damage against the responding card's user.
- Tested phase-wide unlimited use and unrespondable-card rewards; both were later reduced.

- 遂宁黑色结果改为对所响应牌的使用者造成直接伤害。
- 尝试“所有牌无次数限制”和“本阶段所有牌不可响应”，后续因强度与决策问题削弱。

## [Revision]

- Replaced Pingshu with Suining, added Fuhuo, and established the two-stage growth structure.
- 以遂宁取代平蜀，加入伏火，形成“先征服、后三伐”的二阶段结构。

## [Initial]

- First mission-skill concept and three-branch Sanfa draft.
- 最初的使命技平蜀与三段式三伐草案。
