# 逆引き

エラー、やりたいこと、コマンドから記事を探すためのカテゴリです。

## 記事

- [`dotnet` が見つからない](01_dotnetが見つからない.md)
- [ビルドエラーの読み方](02_ビルドエラーの読み方.md)
- [null 関連エラー](03_null関連エラー.md)
- [NuGet 復元エラー](04_NuGet復元エラー.md)
- [よく使う dotnet コマンド](05_よく使うdotnetコマンド.md)
- [VS Code で補完が効かない](06_VSCodeで補完が効かない.md)
- [DI 登録漏れ](07_DI登録漏れ.md)
- [Options 検証エラー](08_Options検証エラー.md)
- [EF Core Migration 失敗](09_EFCoreMigration失敗.md)
- [HttpClient タイムアウト](10_HttpClientタイムアウト.md)
- [CI で dotnet test 失敗](11_CIでdotnet-test失敗.md)
- [async / await 誤用](12_async-await誤用.md)
- [非同期デッドロック](13_非同期デッドロック.md)
- [EF Core N+1 問題](14_EFCoreN+1問題.md)
- [CORS エラー](15_CORSエラー.md)
- [Rate limit と 429](16_RateLimitと429.md)
- [SQL Injection 対策](17_SQLInjection対策.md)
- [デプロイ失敗](18_デプロイ失敗.md)
- [Container 起動失敗](19_Container起動失敗.md)
- [EF Core 性能問題](20_EFCore性能問題.md)

## 症状から探す

- コマンドが動かない: [`dotnet` が見つからない](01_dotnetが見つからない.md), [NuGet 復元エラー](04_NuGet復元エラー.md)
- build / test / deploy が失敗する: [ビルドエラーの読み方](02_ビルドエラーの読み方.md), [CI で dotnet test 失敗](11_CIでdotnet-test失敗.md), [デプロイ失敗](18_デプロイ失敗.md)
- null が原因で落ちる: [null 関連エラー](03_null関連エラー.md)
- DI / Options で起動しない: [DI 登録漏れ](07_DI登録漏れ.md), [Options 検証エラー](08_Options検証エラー.md)
- EF Core が遅い、migration で詰まる: [EF Core Migration 失敗](09_EFCoreMigration失敗.md), [EF Core N+1 問題](14_EFCoreN+1問題.md), [EF Core 性能問題](20_EFCore性能問題.md)
- HTTP / Web API が詰まる: [HttpClient タイムアウト](10_HttpClientタイムアウト.md), [CORS エラー](15_CORSエラー.md), [Rate limit と 429](16_RateLimitと429.md)
- 非同期処理が止まる、追えない: [async / await 誤用](12_async-await誤用.md), [非同期デッドロック](13_非同期デッドロック.md)
- security review で指摘された: [SQL Injection 対策](17_SQLInjection対策.md)
- container が起動しない: [Container 起動失敗](19_Container起動失敗.md)

## 書き方

- エラー文をそのまま見出しに含める。
- 原因、確認コマンド、解決手順を書く。
- 関連する基礎記事へリンクする。
