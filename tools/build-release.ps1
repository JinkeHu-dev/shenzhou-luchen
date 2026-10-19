param(
  [string]$OutputDirectory = ""
)

$repoRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$version = (Get-Content -LiteralPath (Join-Path $repoRoot "VERSION") -Raw).Trim()
if (-not $OutputDirectory) { $OutputDirectory = Join-Path $repoRoot "dist" }
$outputRoot = [System.IO.Path]::GetFullPath($OutputDirectory)
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null

$stageRoot = Join-Path $outputRoot "shenzhou-luchen-v$version"
# Construct the Chinese folder name from code points. Windows PowerShell 5.1
# reads UTF-8 scripts without a BOM as an ANSI code page, so a literal here
# could silently create a mojibake directory before it is zipped.
$packageName = ([string][char]0x795E) + ([char]0x5DDE) + ([char]0x9646) + ([char]0x6C89)
$packageRoot = Join-Path $stageRoot $packageName
$zipPath = Join-Path $outputRoot "shenzhou-luchen-v$version.zip"
$importZipPath = Join-Path $outputRoot "shenzhou-luchen-v$version-import.zip"
$characters = Get-Content -LiteralPath (Join-Path $repoRoot "characters.json") -Raw | ConvertFrom-Json
$huanwenVersion = $characters.hwd_huanwen.implementationVersion
$huanwenZipPath = Join-Path $outputRoot "huanwen-extension-v$huanwenVersion.zip"

if ($stageRoot.StartsWith($outputRoot, [System.StringComparison]::OrdinalIgnoreCase) -and (Test-Path -LiteralPath $stageRoot)) {
  Remove-Item -LiteralPath $stageRoot -Recurse -Force
}
if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }
if (Test-Path -LiteralPath $importZipPath) { Remove-Item -LiteralPath $importZipPath -Force }
if (Test-Path -LiteralPath $huanwenZipPath) { Remove-Item -LiteralPath $huanwenZipPath -Force }

New-Item -ItemType Directory -Force -Path $packageRoot | Out-Null
Get-ChildItem -LiteralPath (Join-Path $repoRoot "extension") | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination $packageRoot -Recurse
}
foreach ($projectFile in @("LICENSE", "NOTICE.md", "README.md", "README.en.md")) {
  Copy-Item -LiteralPath (Join-Path $repoRoot $projectFile) -Destination $packageRoot
}
Add-Type -AssemblyName System.IO.Compression.FileSystem
$compression = [System.IO.Compression.CompressionLevel]::Optimal
$utf8 = [System.Text.Encoding]::UTF8
# Use the encoding-aware overload so the Chinese extension directory remains
# portable across Windows Explorer, 7-Zip and other ZIP readers.
[System.IO.Compression.ZipFile]::CreateFromDirectory($packageRoot, $zipPath, $compression, $true, $utf8)
[System.IO.Compression.ZipFile]::CreateFromDirectory($packageRoot, $importZipPath, $compression, $false, $utf8)
Remove-Item -LiteralPath $stageRoot -Recurse -Force

$huanwenName = ([string][char]0x67D3) + ([char]0x7D2B) + ([char]0x938F) + ([char]0x75D5) + ([char]0x00B7) + ([char]0x6853) + ([char]0x6E29)
$huanwenStage = Join-Path $outputRoot "huanwen-extension-v$huanwenVersion"
$huanwenRoot = Join-Path $huanwenStage $huanwenName
if ($huanwenStage.StartsWith($outputRoot, [System.StringComparison]::OrdinalIgnoreCase) -and (Test-Path -LiteralPath $huanwenStage)) {
  Remove-Item -LiteralPath $huanwenStage -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $huanwenRoot | Out-Null
Get-ChildItem -LiteralPath (Join-Path $repoRoot "extension/src/characters/huanwen") | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination $huanwenRoot -Recurse
}

$entrySource = @"
// NoName extension entry: Huan Wen 4.2.
// Copyright (C) 2026 JinkeHu-dev
// SPDX-License-Identifier: GPL-3.0-only

import characters from "./character.js";
import skills from "./skill.js";
import translates from "./translate.js";
import dynamicTranslate from "./dynamicTranslate.js";

export const type = "extension";

export default {
  name: "$huanwenName",
  editable: false,
  connect: true,
  content() {},
  precontent() {},
  config: {},
  help: {},
  package: {
    intro: "$huanwenName 4.2，适用于《无名杀》的独立武将扩展。",
    author: "JinkeHu-dev",
    version: "$huanwenVersion",
    character: {
      character: characters,
      characterTitle: { hwd_huanwen: "染紫鎏痕·4.2" },
      characterIntro: {
        hwd_huanwen: "$huanwenName：晋，3/3。技能：遂宁、伏火、三伐、慎图。",
      },
      translate: translates,
      dynamicTranslate,
    },
    card: { card: {}, translate: {}, list: [] },
    skill: { skill: skills, translate: {} },
  },
  files: { character: [], card: [], skill: [], audio: [] },
};
"@
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Join-Path $huanwenRoot "extension.js"), $entrySource, $utf8NoBom)

$huanwenInfo = [ordered]@{
  name = $huanwenName
  intro = "$huanwenName 4.2，适用于《无名杀》的独立武将扩展，不附带第三方美术与音频。"
  author = "JinkeHu-dev"
  version = $huanwenVersion
  diskURL = ""
  forumURL = ""
} | ConvertTo-Json
[System.IO.File]::WriteAllText((Join-Path $huanwenRoot "info.json"), $huanwenInfo, $utf8NoBom)

Copy-Item -LiteralPath (Join-Path $repoRoot "docs/characters/huanwen/STANDALONE_README.md") -Destination (Join-Path $huanwenRoot "README.md")
foreach ($projectFile in @("LICENSE", "NOTICE.md")) {
  Copy-Item -LiteralPath (Join-Path $repoRoot $projectFile) -Destination $huanwenRoot
}
[System.IO.Compression.ZipFile]::CreateFromDirectory($huanwenRoot, $huanwenZipPath, $compression, $true, $utf8)
Remove-Item -LiteralPath $huanwenStage -Recurse -Force

Write-Output $zipPath
Write-Output $importZipPath
Write-Output $huanwenZipPath
