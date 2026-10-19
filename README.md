# 染紫鎏痕·桓温 4.0

[返回神州陆沉当前版本](https://github.com/JinkeHu-dev/shenzhou-luchen) · [阅读4.2策划书](https://github.com/JinkeHu-dev/shenzhou-luchen/blob/main/docs/characters/huanwen/design/%E6%9F%93%E7%B4%AB%E9%8E%8F%E7%97%95%C2%B7%E6%A1%93%E6%B8%A9%E7%AD%96%E5%88%92%E4%B9%A6_v4.2.md)

**晋　3/3**

## 版本说明

- 三伐改为把亮出的牌置入牌堆底，再从牌堆底摸X张。
- 形成牌堆底存取机制。
- 测试结论：三张同花色可以整组保留在牌堆顶，下一次继续利用，存在循环漏洞。
- 标签：`huanwen-v4.0.0`

Bottom-deck storage and drawing were introduced, but a three-card same-suit group could be retained on top and recycled.

## 源码

无名杀扩展入口：extension/extension.js；武将源码：extension/src/characters/huanwen/。

源码采用 GPL-3.0-only；原创策划内容另行保留版权。上游出处与第三方权利说明见 NOTICE.md。