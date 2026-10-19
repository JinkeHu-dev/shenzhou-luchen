# 神州陆沉

**简体中文** ｜ [English](README.en.md)

[策划书](#策划书) · [下载](#下载) · [安装](#安装) · [当前公开内容](#当前公开内容) · [武将技能](#武将技能) · [项目目录](#项目目录) · [版本管理](#版本管理) · [版权与许可](#版权与许可)

> “神州陆沉”是一个基于《无名杀》的开源武将扩展项目。

## 策划书

策划书完整收录技能规则、设计思路、史实转译、概率分析、平衡推演与代码实现。

### 染紫鎏痕·桓温策划书 v4.2

**[在线阅读《染紫鎏痕·桓温策划书 v4.2》](docs/characters/huanwen/design/染紫鎏痕·桓温策划书_v4.2.md)** · [下载 Word 版](docs/characters/huanwen/design/染紫鎏痕·桓温策划书_v4.2.docx?raw=1)

## 下载

> **运行本扩展前，必须先安装《无名杀》。本项目不捆绑游戏本体。**

| 下载项 | 官方入口 |
| --- | --- |
| **① 无名杀本体** | **[官方源码仓库](https://github.com/libnoname/noname)** · **[官方 Releases](https://github.com/libnoname/noname/releases)** |
| **② 神州陆沉** | **[本项目 Releases：下载最新扩展包](https://github.com/JinkeHu-dev/shenzhou-luchen/releases/latest)** |

当前 **v0.1.0** 提供扩展安装包，不含《无名杀》程序、官方或第三方美术、卡面及语音。

## 安装

先安装《无名杀》：进入其[官方源码仓库](https://github.com/libnoname/noname)或[官方 Releases](https://github.com/libnoname/noname/releases)获取游戏。安装并启动游戏后，再从[神州陆沉 Releases](https://github.com/JinkeHu-dev/shenzhou-luchen/releases/latest)下载扩展包，并从以下两种方法中选择一种。两个 ZIP 分别用于游戏内导入和手动解压，请勿混用。

### 方法一：在游戏内导入 ZIP

下载 `shenzhou-luchen-v0.1.0-import.zip`，不要解压。

1. 启动《无名杀》，点击游戏界面的“选项”。
2. 在上方分页中点击“扩展”。
3. 将左侧扩展列表向下滚动，点击“获取扩展”。
4. 在右侧展开“导入扩展”，选择刚下载的 `-import.zip`，点击“确定”。
5. 完全退出并重新启动游戏，在“选项 → 扩展”中找到“神州陆沉”并确认已启用。

### 方法二：打开目录后手动解压

下载 `shenzhou-luchen-v0.1.0.zip`。

1. 启动 PC 版《无名杀》，点击窗口顶部“操作 → 打开无名杀目录”。
2. 在打开的位置进入 `extension` 文件夹。
3. 将 ZIP 直接解压到此处。完成后的关键路径必须是 `extension/神州陆沉/extension.js`。
4. 如果出现 `extension/神州陆沉/神州陆沉/extension.js`，说明多套了一层同名文件夹，应移除其中一层。
5. 完全退出并重新启动游戏，进入“选项 → 扩展”，在左侧列表中找到“神州陆沉”并开启。

“获取扩展”和“打开无名杀目录”是两种安装入口：前者导入 `-import.zip`，后者手动解压普通 ZIP，无需依次点击。

开发者可直接复制仓库中的 [`extension/`](extension/) 目录内容。当前发布包没有武将图片，游戏使用无图片占位显示。

## 当前公开内容

| 项目 | 当前版本 |
| --- | --- |
| 神州陆沉项目与扩展 | 0.1.0 |
| 染紫鎏痕·桓温策划 | 4.2 |
| 染紫鎏痕·桓温源码实现 | 4.2.0 |
| 目标环境 | 无名杀 v1.11.6 及相近版本 |

### 染紫鎏痕·桓温 4.2

- 势力与体力：晋，3/3
- 技能：遂宁、伏火、三伐、慎图
- 策划书：[在线阅读](docs/characters/huanwen/design/染紫鎏痕·桓温策划书_v4.2.md) · [下载 Word 版](docs/characters/huanwen/design/染紫鎏痕·桓温策划书_v4.2.docx?raw=1)
- 迭代索引：[`docs/characters/huanwen/versions/`](docs/characters/huanwen/versions/README.md)
- 验证记录：[`tests/characters/huanwen/manual-verification.md`](tests/characters/huanwen/manual-verification.md)

## 武将技能

### 染紫鎏痕·桓温 4.2

**晋　3/3**

**【遂宁】** 每轮开始时，若场上没有“成”，你可以令距离1以内的一名其他角色获得“成”标记。当你使用或打出【闪】时，你可以进行判定，若结果为：红色，你获得所响应牌的使用者的一张牌；黑色，你对其造成1点伤害。<br>
当你对有“成”的角色累计造成3点伤害后，或其进入濒死状态时，你加1点体力上限并将体力回复至体力上限，将〖三伐〗改为“出牌阶段限三次”，然后移去“成”标记并失去此技能。

**【伏火】** 你可以将一张锦囊牌当【闪】使用或打出；出牌阶段限一次，你可以将一张锦囊牌和一张基本牌当【火攻】使用。

**【三伐】** 出牌阶段限一次，你可以用一张手牌交换牌堆顶的一张牌，然后亮出牌堆顶的三张牌，将其中至多两张置于牌堆顶，其余的牌各置入牌堆底或弃置，然后从牌堆底摸X张牌（X为亮出的牌中同花色牌数的最大值）。若X不小于2，你于此阶段能使用【杀】的次数+1；若X为3，你于此阶段使用的下一张牌不可被响应，且你加1点体力上限。

**【慎图】** 锁定技，出牌阶段结束时，若你于此阶段造成的伤害值小于你发动〖三伐〗的次数，你减1点体力上限。

## 项目目录

```text
shenzhou-luchen/
├─ extension/                         # 可安装的扩展目录
│  ├─ extension.js                    # 总入口与公开武将注册
│  ├─ info.json                       # 神州陆沉项目元数据
│  └─ src/characters/huanwen/         # 染紫鎏痕·桓温源码
├─ docs/
│  ├─ project/                        # 项目目录与版本规范
│  └─ characters/huanwen/             # 策划书、许可与版本沿革
├─ tests/characters/huanwen/           # 验证记录
├─ tools/                              # 校验与发布包构建
├─ characters.json                     # 已公开武将及版本清单
├─ VERSION                             # 项目版本
├─ README.md                           # 中文仓库首页
├─ README.en.md                        # English repository homepage
└─ CHANGELOG.md                        # 发布记录
```

完整说明见 [`docs/project/REPOSITORY_STRUCTURE.md`](docs/project/REPOSITORY_STRUCTURE.md)。武将源码、文档和测试按角色分目录保存。

## 版本管理

- 神州陆沉项目使用语义化版本；首次公开版为 **0.1.0**，标签为 **`v0.1.0`**。
- 染紫鎏痕·桓温当前策划版本为 **4.2**，对应源码版本为 **4.2.0**，源码标签为 **`huanwen-v4.2.0`**。
- **2.0 → 3.0 → 4.0 → 4.1 → 4.2** 各版代码均可通过对应标签查看。
- `main` 保存当前公开稳定版；每项可审阅的修改独立提交。
- 已发布标签不移动、不覆盖。项目修复增加项目补丁号；武将规则变化更新该武将自己的版本和文档。
- 版本说明见 [`docs/project/VERSIONING.md`](docs/project/VERSIONING.md)，染紫鎏痕·桓温的版本沿革见 [`docs/characters/huanwen/CHANGELOG.md`](docs/characters/huanwen/CHANGELOG.md)。

## 版权与许可

- 源码以 **GNU GPL v3.0 only** 发布，见 [`LICENSE`](LICENSE)。
- 原创策划书及文字内容版权另行保留，见 [`docs/characters/huanwen/LICENSE.md`](docs/characters/huanwen/LICENSE.md)。源码采用 GPL 不等于策划书同时采用 GPL。
- 本仓库不包含官方或第三方美术、卡面、语音、字体和专有游戏程序。上游出处及详细声明见 [`NOTICE.md`](NOTICE.md)。
