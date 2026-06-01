# Secret 管理

## 目的

API key、接続文字列、token などの秘密情報をコードやログに出さず管理します。

## 前提

- [設定管理と IOptions](../07_設計と実務パターン/10_IOptionsとConfiguration.md) を読んでいる

## 要点

- secret は repository にコミットしません。API key、接続文字列、token、証明書 password などは、public / private repository の違いに関係なくコード管理から分離します。
- local 開発では User Secrets や環境変数を使います。`appsettings.Development.json` にも本物の secret は置かず、開発者ごとの PC に閉じた場所から読み込ませます。
- CI/CD では GitHub Secrets などの secret store を使います。workflow file には secret の名前だけを書き、値そのものは CI/CD platform の保護された設定に登録します。
- ログ、例外、スクリーンショットにも secret を出しません。request / response、設定 object、例外 message をそのまま出すと、意図せず credential が残ることがあります。
- secret が漏れた可能性がある場合は、削除だけでは不十分です。対象 key の無効化、再発行、影響範囲の確認、履歴やログに残った値の扱いまで対応します。
- 通常設定と secret を分けて管理します。URL、timeout、feature flag は通常設定、credential や token は secret として扱うと、レビュー時にも危険な値を見つけやすくなります。

## User Secrets 例

```powershell
dotnet user-secrets init
dotnet user-secrets set "ExternalApi:ApiKey" "local-secret-value"
```

## GitHub Actions Secrets 例

```yaml
env:
  ConnectionStrings__DefaultConnection: ${{ secrets.DEFAULT_CONNECTION }}
  ExternalApi__ApiKey: ${{ secrets.EXTERNAL_API_KEY }}
```

workflow には secret の名前だけを書きます。値は GitHub repository または organization の Secrets に登録します。pull request from fork では secrets が渡らない場合があるため、CI の実行条件も確認します。

## Azure Key Vault を使う場面

```csharp
if (!builder.Environment.IsDevelopment())
{
  var keyVaultUrl = builder.Configuration["KeyVault:Url"];

    if (!string.IsNullOrWhiteSpace(keyVaultUrl))
    {
        builder.Configuration.AddAzureKeyVault(
            new Uri(keyVaultUrl),
            new DefaultAzureCredential());
    }
}
```

本番環境で secret の数が増える、rotation を自動化したい、アクセス権を Azure AD / Entra ID で管理したい場合は Key Vault を検討します。local 開発では User Secrets、CI では GitHub Secrets、本番では Key Vault のように、環境ごとに責務を分けます。

## secret の分類

| 種類 | 置き場所の例 | 注意点 |
| --- | --- | --- |
| local 開発用 API key | User Secrets | チーム共有しない |
| CI の接続文字列 | GitHub Secrets | log に出さない |
| 本番 DB password | Key Vault など | rotation 手順を決める |
| timeout や URL | appsettings | secret と混ぜない |
| feature flag | appsettings / feature management | credential ではない |

## 実務での使い方

secret と通常設定を分け、どの環境でどこから供給するかを README に残します。漏えい時は rotate、無効化、影響調査を行います。CI や本番で設定漏れが起きるとデプロイ失敗につながるため、[デプロイ失敗時の診断](12_デプロイ失敗時の診断.md) の観点でも確認します。

## よくあるミス

- `appsettings.json` に API key を書く。
- CI ログに secret を echo する。
- local の secret をチーム共有チャットに貼る。
- 漏えい後に key rotation しない。
- secret と通常設定を同じ扱いにして、review で危険な値を見落とす。

## 関連リンク

- [Safe storage of app secrets in development](https://learn.microsoft.com/aspnet/core/security/app-secrets)
- [Azure Key Vault configuration provider](https://learn.microsoft.com/aspnet/core/security/key-vault-configuration)
