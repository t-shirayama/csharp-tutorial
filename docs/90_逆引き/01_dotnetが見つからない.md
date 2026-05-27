# `dotnet` が見つからない

## 症状

PowerShell や VS Code 統合ターミナルで `dotnet` コマンドが認識されません。

## 確認コマンド

```powershell
dotnet --info
Get-Command dotnet
$env:PATH
```

## 主な原因

- .NET SDK がインストールされていない。
- Runtime だけが入っている。
- PATH が反映されていない。
- VS Code が古い環境変数を継承している。

## 対処

1. .NET SDK をインストールする。
2. 新しい PowerShell を開く。
3. VS Code を再起動する。
4. `dotnet --list-sdks` で SDK を確認する。

## 関連

- [.NET SDK のインストールと確認](../00_環境構築/01_dotnet-sdk.md)
