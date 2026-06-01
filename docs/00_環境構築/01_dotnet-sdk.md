# .NET SDK のインストールと確認

## 目的

C# をビルド・実行するための .NET SDK を入れ、`dotnet` コマンドが使えることを確認します。

## 要点

- 注意: Runtime だけを入れている。
- 注意: インストール後に古い PowerShell や VS Code を使い続けている。
- 注意: Windows x64 ではなく x86 installer を選んでいる。

## 必要なもの

- Windows
- PowerShell
- .NET 10 SDK

学習用 PC には Runtime ではなく **SDK** を入れます。SDK にはビルド、実行、テンプレート作成に必要なものが含まれます。

## インストール

PowerShell で `winget` が使える場合:

```powershell
winget install --id Microsoft.DotNet.SDK.10 --source winget
```

公式サイトから入れる場合は、Windows x64 の **SDK** installer を選びます。

- [.NET 10.0 downloads](https://dotnet.microsoft.com/download/dotnet/10.0)
- [.NET を Windows にインストールする](https://learn.microsoft.com/dotnet/core/install/windows)

インストール後は PowerShell と VS Code を開き直します。

## 確認

```powershell
dotnet --version
dotnet --list-sdks
dotnet --info
```

`dotnet --version` で `10.` から始まるバージョンが表示されれば、学習開始に必要な状態です。

## 最小確認

```powershell
dotnet new console -n HelloCSharp
Set-Location HelloCSharp
dotnet run
```

`Hello, World!` が表示されれば成功です。

## 関連リンク

- [.NET CLI 概要](https://learn.microsoft.com/dotnet/core/tools/)
