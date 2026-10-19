# Shenzhou Luchen

[简体中文](README.md) ｜ **English**

[Design documents](#design-documents) · [Download](#download) · [Installation](#installation) · [Current public content](#current-public-content) · [Character skills](#character-skills) · [Repository layout](#repository-layout) · [Version management](#version-management) · [Copyright and licensing](#copyright-and-licensing)

> Shenzhou Luchen is an open-source character extension project built for *NoName*.

## Design documents

The design documents contain the complete skill rules, design rationale, historical adaptation, probability analysis, balance simulations, and implementation details.

### Stained Purple, Gilded Traces · Huan Wen — Design Document v4.2

**[Read *Stained Purple, Gilded Traces · Huan Wen — Design Document v4.2* on GitHub](docs/characters/huanwen/design/染紫鎏痕·桓温策划书_v4.2.md)** · [Download the Word edition](docs/characters/huanwen/design/染紫鎏痕·桓温策划书_v4.2.docx?raw=1)

## Download

> **NoName must be installed before this extension can run. The game itself is not bundled with this project.**

| Download | Official source |
| --- | --- |
| **① NoName** | **[Official source repository](https://github.com/libnoname/noname)** · **[Official Releases](https://github.com/libnoname/noname/releases)** |
| **② Shenzhou Luchen** | **[Project Releases: download the latest extension](https://github.com/JinkeHu-dev/shenzhou-luchen/releases/latest)** |

The current **v0.1.0** release contains the extension packages only. It does not include NoName, official or third-party artwork, card images, or voice lines.

## Installation

First install NoName from its [official source repository](https://github.com/libnoname/noname) or [official Releases](https://github.com/libnoname/noname/releases). After installing and launching the game, download Shenzhou Luchen from the [project Releases](https://github.com/JinkeHu-dev/shenzhou-luchen/releases/latest) and choose one of the following methods. The two ZIP files are intended for different installation methods and should not be mixed.

### Method 1: import the ZIP in the game

Download `shenzhou-luchen-v0.1.0-import.zip` without extracting it.

1. Launch NoName and open **Options**.
2. Select the **Extensions** tab at the top.
3. Scroll down the extension list on the left and select **Get Extensions**.
4. Expand **Import Extension** on the right, select the downloaded `-import.zip`, and confirm.
5. Exit the game completely and restart it. Open **Options → Extensions**, find **Shenzhou Luchen**, and make sure it is enabled.

### Method 2: open the game directory and extract manually

Download `shenzhou-luchen-v0.1.0.zip`.

1. Launch the PC version of NoName and choose **Operations → Open NoName Directory** from the window menu.
2. Open the `extension` directory.
3. Extract the ZIP directly into this directory. The resulting path must be `extension/神州陆沉/extension.js`.
4. If the result is `extension/神州陆沉/神州陆沉/extension.js`, remove one of the duplicated directory levels.
5. Exit the game completely and restart it. Open **Options → Extensions**, find **Shenzhou Luchen** in the list on the left, and enable it.

**Get Extensions** and **Open NoName Directory** are separate installation routes: the former imports the `-import.zip`, while the latter is used to extract the standard ZIP manually.

Developers may copy the contents of [`extension/`](extension/) directly. The current release does not contain character artwork, so the game displays its image-free placeholder.

## Current public content

| Item | Current version |
| --- | --- |
| Shenzhou Luchen project and extension | 0.1.0 |
| Stained Purple, Gilded Traces · Huan Wen — design | 4.2 |
| Stained Purple, Gilded Traces · Huan Wen — implementation | 4.2.0 |
| Target runtime | NoName v1.11.6 and nearby versions |

### Stained Purple, Gilded Traces · Huan Wen 4.2

- Faction and health: Jin, 3/3
- Skills: Suining, Fuhuo, Sanfa, and Shentu
- Design document: [read on GitHub](docs/characters/huanwen/design/染紫鎏痕·桓温策划书_v4.2.md) · [download the Word edition](docs/characters/huanwen/design/染紫鎏痕·桓温策划书_v4.2.docx?raw=1)
- Version index: [`docs/characters/huanwen/versions/`](docs/characters/huanwen/versions/README.md)
- Verification record: [`tests/characters/huanwen/manual-verification.md`](tests/characters/huanwen/manual-verification.md)

## Character skills

### Stained Purple, Gilded Traces · Huan Wen 4.2

**Jin　3/3**

**Suining.** At the start of each round, if no character has the Cheng mark, you may give it to another character within distance 1. Whenever you use or respond with a Dodge, you may perform a judgment. Red: gain one card from the user of the card you responded to. Black: deal 1 damage to that character. After you have dealt a total of 3 damage to the marked character, or when that character enters the dying state, gain 1 maximum health, recover to full health, upgrade Sanfa to three uses per Play Phase, remove the mark, and lose this skill.

**Fuhuo.** You may use or respond with a trick card as Dodge. Once per Play Phase, you may use one trick card and one basic card together as Fire Attack.

**Sanfa.** Once per Play Phase, exchange one hand card with the top card of the draw pile, then reveal the top three cards. Put up to two on top and put each remaining card on the bottom or into the discard pile. Draw X cards from the bottom, where X is the largest number of revealed cards sharing a suit. If X is at least 2, increase your Slash usage limit by 1 this phase. If X is 3, your next card this phase cannot be responded to, and you gain 1 maximum health.

**Shentu.** Locked. At the end of your Play Phase, if the damage you dealt during that phase is lower than the number of Sanfa activations, lose 1 maximum health.

## Repository layout

```text
shenzhou-luchen/
├─ extension/                         # Installable extension directory
│  ├─ extension.js                    # Entry point and public character registration
│  ├─ info.json                       # Project metadata
│  └─ src/characters/huanwen/         # Huan Wen source
├─ docs/
│  ├─ project/                        # Repository and versioning rules
│  └─ characters/huanwen/             # Design, licensing, and version history
├─ tests/characters/huanwen/           # Verification records
├─ tools/                              # Validation and release packaging
├─ characters.json                     # Public characters and versions
├─ VERSION                             # Project version
├─ README.md                           # Chinese repository homepage
├─ README.en.md                        # English repository homepage
└─ CHANGELOG.md                        # Release history
```

See [`docs/project/REPOSITORY_STRUCTURE.md`](docs/project/REPOSITORY_STRUCTURE.md) for the complete layout. Character source, documentation, and tests are stored in separate directories.

## Version management

- Shenzhou Luchen uses semantic versioning. Its first public release is **0.1.0**, tagged **`v0.1.0`**.
- The current Huan Wen design version is **4.2**; its implementation version is **4.2.0**, tagged **`huanwen-v4.2.0`**.
- Source for **2.0 → 3.0 → 4.0 → 4.1 → 4.2** is available through the corresponding tags.
- `main` holds the current stable public version, and each reviewable change is committed separately.
- Published tags are not moved or overwritten. Project fixes increment the project patch version; character rule changes update that character's own version and documentation.
- See [`docs/project/VERSIONING.md`](docs/project/VERSIONING.md) for project versioning and [`docs/characters/huanwen/CHANGELOG.md`](docs/characters/huanwen/CHANGELOG.md) for Huan Wen's version history.

## Copyright and licensing

- Source code is released under **GNU GPL v3.0 only**; see [`LICENSE`](LICENSE).
- Copyright in the original design documents and prose is reserved separately; see [`docs/characters/huanwen/LICENSE.md`](docs/characters/huanwen/LICENSE.md). Releasing the source under GPL does not place the design document under GPL.
- This repository contains no official or third-party artwork, card images, voice lines, fonts, or proprietary game binaries. See [`NOTICE.md`](NOTICE.md) for upstream attribution and full notices.
