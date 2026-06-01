# 接続文字列と Secret

## 目的

DB 接続文字列を安全に管理し、環境ごとの差分を整理します。

## 前提

- [設定管理と IOptions](../07_設計と実務パターン/10_IOptionsとConfiguration.md) を読んでいる
- [Secret 管理](../11_ツールと運用/10_Secret管理.md) を読んでいる

## 要点

- 接続文字列には secret が含まれることがあります。
- 開発では User Secrets や環境変数を使います。
- 本番ではクラウドの secret store や環境変数を使います。
- connection string name を統一します。

## appsettings の例

```json
{
  "ConnectionStrings": {
    "Default": "Server=localhost;Database=Todo;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

## 登録例

```csharp
// この例では「接続文字列と Secret」の要点を最小のコードで確認します。
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
```

## コードの読み方

このコード例は「接続文字列と Secret」の基本形を確認するためのものです。上から順に、値や object を用意し、C# の構文や .NET API を使い、最後に結果を確認します。まず入力、処理、出力の 3 つに分けて読むと、初学者でも流れを追いやすくなります。

## 実務での使い方

local、development、staging、production で DB が変わるため、設定の供給元を明確にします。ログに接続文字列を出さないことも重要です。

## よくあるミス

- 本番パスワード入り接続文字列をコミットする。
- 環境名ごとに connection string key が違う。
- ログや例外に secret が出る。
- migration 実行先 DB を間違える。

## 関連リンク

- [Connection strings and configuration](https://learn.microsoft.com/ef/core/miscellaneous/connection-strings)
