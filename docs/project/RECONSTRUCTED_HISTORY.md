# 桓温源码版本记录 / Huan Wen Source Version History

本仓库保留桓温2.0、3.0、4.0、4.1、4.2五个连续、可运行的源码版本。每个版本都修改同一份源码，可以通过对应标签查看。

| 顺序 | 标签 | 主要实现差异 |
| --- | --- | --- |
| 1 | `huanwen-v2.0.0` | 交换牌堆底；获得至多X张；三伐牌不计手牌上限；阶段内不限次数与不可响应 |
| 2 | `huanwen-v3.0.0` | 删除三伐牌不计手牌上限 |
| 3 | `huanwen-v4.0.0` | 引入置底后从牌堆底摸X张；奖励收束为杀次数+1和下一张牌不可响应；仍可零张置底 |
| 4 | `huanwen-v4.1.0` | 强制至少一张亮牌置底，封堵三张同花色整组留顶循环 |
| 5 | `huanwen-v4.2.0` | 改为交换牌堆顶；牌堆顶至多保留两张；其余牌置底或弃置 |

这些版本于2026-10-13根据《染紫鎏痕·桓温策划书4.2》的版本对照表整理入库。提交日期是整理入库日期，不是各版方案最初形成的日期。初稿和修订稿没有对应源码，只保留策划文本。

五个版本按表中顺序提交并添加对应标签，最后添加项目发布标签 `v0.1.0`。

---

This repository preserves Huan Wen 2.0 through 4.2 as five consecutive runnable source versions. They were organized and committed on 2026-10-13 from the version matrix in Design Document 4.2, so the commit dates record when they entered the repository. The initial and revised drafts are preserved as design documents because they have no corresponding source versions.
