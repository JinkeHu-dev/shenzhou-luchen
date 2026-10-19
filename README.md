# 染紫鎏痕·桓温 4.1

[返回神州陆沉当前版本](https://github.com/JinkeHu-dev/shenzhou-luchen) · [阅读4.2策划书](https://github.com/JinkeHu-dev/shenzhou-luchen/blob/main/docs/characters/huanwen/design/%E6%9F%93%E7%B4%AB%E9%8E%8F%E7%97%95%C2%B7%E6%A1%93%E6%B8%A9%E7%AD%96%E5%88%92%E4%B9%A6_v4.2.md)

**晋　3/3**

## 版本说明

- 要求从亮牌中将1至X张置入牌堆底。
- 修复三张同花整组留顶的循环。
- 测试结论：强制下置数量虽然封堵循环，却妨碍“把多余牌留在底部以后取回”的策略。
- 标签：`huanwen-v4.1.0`

Requiring 1 to X bottom placements fixed the recycling loop, but constrained intentional bottom storage.

## 源码

无名杀扩展入口：extension/extension.js；武将源码：extension/src/characters/huanwen/。

源码采用 GPL-3.0-only；原创策划内容另行保留版权。上游出处与第三方权利说明见 NOTICE.md。