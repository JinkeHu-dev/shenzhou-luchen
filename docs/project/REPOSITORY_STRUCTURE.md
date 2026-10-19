# 神州陆沉目录设计 / Repository structure

```text
shenzhou-luchen/
├─ .github/workflows/validate.yml
├─ extension/
│  ├─ extension.js
│  ├─ info.json
│  └─ src/
│     └─ characters/
│        └─ huanwen/
│           ├─ character.js
│           ├─ skill.js
│           ├─ rules.js
│           ├─ sanfa-interface.js
│           ├─ translate.js
│           └─ dynamicTranslate.js
├─ docs/
│  ├─ project/
│  │  ├─ REPOSITORY_STRUCTURE.md
│  │  └─ VERSIONING.md
│  └─ characters/
│     └─ huanwen/
│        ├─ design/染紫鎏痕·桓温策划书_v4.2.md
│        ├─ design/染紫鎏痕·桓温策划书_v4.2.docx
│        ├─ versions/
│        ├─ CHANGELOG.md
│        ├─ STANDALONE_README.md
│        └─ LICENSE.md
├─ tests/
│  └─ characters/huanwen/manual-verification.md
├─ tools/
│  ├─ build-release.ps1
│  └─ verify.mjs
├─ characters.json
├─ VERSION
├─ CHANGELOG.md
├─ README.md
├─ README.en.md
├─ LICENSE
└─ NOTICE.md
```

## 分层原则

1. `extension/` 是扩展安装包的来源；复制其内容即可安装。
2. `extension/extension.js` 只负责聚合已公开武将，不承载具体技能逻辑。
3. 每名武将使用 `extension/src/characters/<id>/` 独立目录，内部保存角色定义、技能、文本和专用界面。
4. 每名武将的策划书、版本沿革、许可说明分别保存在 `docs/characters/<id>/`。
5. 每名武将的测试记录保存在 `tests/characters/<id>/`，避免项目级验证和角色级验证混在一起。
6. 只有已经公开的武将才加入 `characters.json` 和扩展入口；不为未公开内容建立空源码占位。
7. 多名武将真正复用的稳定代码出现后，再建立 `extension/src/shared/`；不预先制造没有用途的公共层。

## Layering rules

1. `extension/` is the source of extension archives and can be copied directly for installation.
2. `extension/extension.js` aggregates public characters without holding character-specific mechanics.
3. Each character receives an independent `extension/src/characters/<id>/` directory.
4. Each character's design, history, and document license live under `docs/characters/<id>/`.
5. Character verification lives under `tests/characters/<id>/`.
6. Only published characters are registered in `characters.json`; no source placeholders are created for unpublished content.
7. A shared source layer is introduced only after real reusable code exists.

