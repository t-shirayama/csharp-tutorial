# 設定管理と IOptions

## 目的

環境ごとに変わる値をコードから分離し、`appsettings.json`、環境変数、`IOptions<T>` を使って型付きオブジェクトとして安全に扱えるようにします。

## 前提

- [DI コンテナの実装](09_DIコンテナの実装.md) を読んでいる

## 要点

- 設定値はコードに直書きしません。
- 環境変数、appsettings、User Secrets、Key Vault などを使い分けます。
- 秘密情報は Git に入れません。
- `IConfiguration` は設定値へアクセスする入口です。
- Options パターンでは設定値を class に bind します。
- 必須設定は起動時に validation します。
- 秘密情報は `appsettings.json` に直接置かず、User Secrets、環境変数、Secret Store を使います。
- `appsettings.Development.json` などで環境別に上書きできます。

## appsettings.json の例

```json
{
  "ExternalApi": {
    "BaseUrl": "https://api.example.com",
    "TimeoutSeconds": 10
  }
}
```

接続文字列、API key、token などの秘密情報は `appsettings.json` に直書きせず、User Secrets、環境変数、Secret Store などから渡します。

## Options class

```csharp
// この例では「設定管理と IOptions」の要点を最小のコードで確認します。
public class ExternalApiOptions
{
    // appsettings.json の section 名を1か所に集約します。
    public const string SectionName = "ExternalApi";

    // 必須値ですが、bind 前に null にならないよう空文字で初期化します。
    public string BaseUrl { get; set; } = "";

    // 未設定時の既定値を決めます。0 以下は validation で拒否します。
    public int TimeoutSeconds { get; set; } = 10;
}
```

## 登録例

```csharp
// この例では「設定管理と IOptions」の要点を最小のコードで確認します。
var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddOptions<ExternalApiOptions>()
    // ExternalApi section を ExternalApiOptions に bind します。
    .Bind(builder.Configuration.GetSection(ExternalApiOptions.SectionName))
    // BaseUrl は絶対 URL でなければ起動時に失敗させます。
    .Validate(options => Uri.TryCreate(options.BaseUrl, UriKind.Absolute, out _), "BaseUrl must be absolute URL.")
    // TimeoutSeconds は正の値だけを許可します。
    .Validate(options => options.TimeoutSeconds > 0, "TimeoutSeconds must be positive.")
    // validation を初回利用時ではなくアプリ起動時に実行します。
    .ValidateOnStart();
```

## コードの読み方

Options class は「設定値を受け取る入れ物」です。`Bind` で `appsettings.json` の `ExternalApi` section を `ExternalApiOptions` に詰め、`Validate` で実行に必要な条件を確認します。

`ValidateOnStart()` を付けると、設定ミスを API 呼び出し時ではなく起動時に検出できます。本番では早く失敗した方が原因を追いやすくなります。

## 利用例

```csharp
// この例では「設定管理と IOptions」の要点を最小のコードで確認します。
public class ExternalApiClient
{
    private readonly ExternalApiOptions options;

    public ExternalApiClient(IOptions<ExternalApiOptions> options)
    {
        // IOptions<T>.Value から bind 済みの設定値を取り出します。
        this.options = options.Value;
    }

    // 文字列設定を Uri として使う境界です。validation 済みなので安全に変換できます。
    public Uri BaseUri => new(options.BaseUrl);
}
```

## 実務での使い方

接続文字列、外部 API URL、タイムアウト、リトライ回数、機能フラグ、バッチ設定などを Options class にまとめます。設定値のキーを文字列で散らばらせず、`SectionName` と型で管理します。

起動時に必須設定を検証すると、実行中の不可解な失敗を減らせます。開発、検証、本番で値をどう切り替えるかも README や運用手順に残します。

## よくあるミス

- `configuration["ExternalApi:BaseUrl"]` をあちこちで直接読む。
- 起動時 validation がなく、実行中に null や不正 URL で失敗する。
- 秘密情報を `appsettings.json` にコミットする。
- Options class に業務ロジックを入れすぎる。
- 環境ごとの上書き順を理解しない。
- 設定名が統一されていない。

## レビュー観点

- 設定 section 名が定数化されているか。
- 必須設定の validation があるか。
- 開発、検証、本番で値をどう切り替えるか説明できるか。
- secret と config を分けて扱っているか。
- 設定値がコードに直書きされていないか。

## 関連リンク

- [Options pattern in .NET](https://learn.microsoft.com/dotnet/core/extensions/options)
- [Configuration in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/configuration/)
- [Configuration in .NET](https://learn.microsoft.com/dotnet/core/extensions/configuration)
