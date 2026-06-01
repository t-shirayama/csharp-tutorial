# solution と project

## 目的

.NET の solution と project の役割を理解します。

## 要点

- `.csproj` は1つのプロジェクト定義です。
- `.sln` は複数プロジェクトをまとめます。
- 実務ではアプリ、ライブラリ、テストを別 project に分けます。
- solution は依存関係そのものではなく、複数 project をまとめて操作する単位です。
- project 同士の依存関係は `dotnet add reference` で `.csproj` に記録します。

## コマンド

```powershell
dotnet new sln -n Sample
dotnet new classlib -n Sample.Domain
dotnet new xunit -n Sample.Tests
dotnet sln add Sample.Domain Sample.Tests
```

`dotnet sln add` は solution に project を登録します。これにより solution root で `dotnet build` や `dotnet test` を実行したときに、登録済み project がまとめて対象になります。

一方、project A から project B の code を使うには project reference が必要です。solution に両方を追加しただけでは code を参照できないため、必要に応じて `dotnet add Sample.Tests reference Sample.Domain` のように依存関係を追加します。

## よくあるミス

- project 参照と NuGet 参照を混同する。
- 依存方向が循環する。
- solution に test project を追加し忘れる。

## 関連リンク

- [dotnet sln](https://learn.microsoft.com/dotnet/core/tools/dotnet-sln)
