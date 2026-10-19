# 染紫鎏痕·桓温 4.2

[返回神州陆沉当前版本](https://github.com/JinkeHu-dev/shenzhou-luchen) · [阅读4.2策划书](https://github.com/JinkeHu-dev/shenzhou-luchen/blob/main/docs/characters/huanwen/design/%E6%9F%93%E7%B4%AB%E9%8E%8F%E7%97%95%C2%B7%E6%A1%93%E6%B8%A9%E7%AD%96%E5%88%92%E4%B9%A6_v4.2.md)

**晋　3/3**

## 版本说明

- 交换位置由牌堆底改为牌堆顶。
- 三张亮牌中至多两张可以置于牌堆顶，其余各自置底或弃置。
- 随后仍从牌堆底摸X张；多余底牌留待以后换回或摸回。
- X不小于2时，本阶段【杀】次数上限+1；X为3时，下一张牌不可被响应并增加1点体力上限。
- 结论：牌堆顶负责短期规划，牌堆底负责跨次存取，并封堵三同花整组留顶循环。
- 标签：`huanwen-v4.2.0`

The current version separates short-term top-deck planning from persistent bottom-deck storage and prevents a complete same-suit trio from remaining on top.

## 源码

无名杀扩展入口：extension/extension.js；武将源码：extension/src/characters/huanwen/。

源码采用 GPL-3.0-only；原创策划内容另行保留版权。上游出处与第三方权利说明见 NOTICE.md。