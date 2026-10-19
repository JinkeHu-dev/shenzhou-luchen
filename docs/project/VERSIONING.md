# 神州陆沉版本管理 / Versioning

神州陆沉同时维护“项目发布版本”和“武将设计版本”，两者用途不同。

| 层级 | 当前值 | 用途 |
| --- | --- | --- |
| 项目版本 | `0.1.0` | 整个扩展的安装包、兼容性和发布记录 |
| 项目标签 | `v0.1.0` | 对应GitHub Release |
| 桓温策划版本 | `4.2` | 策划书规则文本 |
| 桓温实现版本 | `4.2.0` | 对应规则的源码实现 |
| 桓温源码标签 | `huanwen-v4.2.0` | 桓温4.2对应的源码 |

Shenzhou Luchen maintains separate project-release and character-design versions. Project release `0.1.0` contains Huan Wen design 4.2 / implementation 4.2.0.

## 项目版本 / Project releases

项目版本采用语义化版本：

- 补丁号：修复实现错误，公开规则不变，例如 `0.1.1`。
- 次版本号：加入新武将或兼容功能，例如 `0.2.0`。
- 主版本号：出现不兼容的整体结构或安装方式变化。

稳定发布使用 `v<项目版本>` 标签和同名Release。常规扩展发布提供两种安装包：手动解压包 `shenzhou-luchen-v<项目版本>.zip`，以及游戏内导入包 `shenzhou-luchen-v<项目版本>-import.zip`。当前 **v0.1.0** 属于常规扩展发布。

Project releases use semantic versioning and tags such as `v0.1.0`. A standard extension release provides a manual archive and an in-game import archive.

## 武将版本 / Character versions

每名武将独立维护策划与实现版本，并登记在根目录 [`characters.json`](../../characters.json) 中。源码标签使用 `<character>-v<version>`，用于查看该武将某一版本的代码。

桓温保留以下版本记录。初稿与修订稿只有策划文本；2.0至4.2各有对应的源码和标签：

| 策划节点 | Git标签 | 状态 |
| --- | --- | --- |
| 初稿 | 无 | 策划稿 |
| 修订稿 | 无 | 策划稿 |
| 2.0 | `huanwen-v2.0.0` | 对应版本源码 |
| 3.0 | `huanwen-v3.0.0` | 对应版本源码 |
| 4.0 | `huanwen-v4.0.0` | 对应版本源码 |
| 4.1 | `huanwen-v4.1.0` | 对应版本源码 |
| 4.2 | `huanwen-v4.2.0` | 当前版本源码 |

2.0至4.2根据策划书中的版本对照整理入库。提交日期是整理入库日期，完整说明见 [`RECONSTRUCTED_HISTORY.md`](RECONSTRUCTED_HISTORY.md)。

Each character maintains independent design and implementation versions in [`characters.json`](../../characters.json). The initial and revised drafts are preserved as design documents; versions 2.0 through 4.2 have corresponding source tags.

## Git工作规则 / Git workflow

1. `main` 只保存当前公开稳定项目。
2. 一个可审阅改动对应一个提交。
3. 功能工作使用短期分支，检查通过后合并到 `main`。
4. 已发布标签不可移动或覆盖，不强制改写公开历史。
5. 发布项目时同步更新 `VERSION`、`package.json`、`extension/info.json`、`extension/extension.js` 和根目录 `CHANGELOG.md`。
6. 修改武将规则时同步更新 `characters.json`、武将源码、武将策划书、武将 `CHANGELOG.md` 和版本索引。
7. 常规扩展包由 `extension/` 构建；未公开武将不进入公开安装包。

1. `main` contains the current public stable project.
2. Every reviewable change receives a separate commit.
3. Short-lived feature branches are merged only after validation.
4. Published tags and public history are never rewritten.
5. Project releases update every project-version field together.
6. Character rules changes update that character's manifest, source, document, changelog, and milestone index together.
7. Standard extension archives are built from `extension/`; unpublished characters are excluded from public archives.
