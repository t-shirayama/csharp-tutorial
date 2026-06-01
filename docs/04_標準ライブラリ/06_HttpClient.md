# HttpClient と HttpClientFactory

## 目的

外部 API へ HTTP リクエストを送る `HttpClient` の基本と、`IHttpClientFactory` による安全な管理方法を理解します。

## 要点

- `HttpClient` は HTTP 通信を行うためのクラスです。GET や POST を送るだけでなく、header、content、status code、timeout、cancellation まで含めて扱います。
- 実務では使い捨てではなく、DI や `IHttpClientFactory` と組み合わせます。request ごとに `new HttpClient()` すると socket 枯渇を招くことがあり、逆に長寿命 client では DNS 更新への追従も考える必要があります。
- `IHttpClientFactory` は `HttpClient` の生成と handler lifetime を管理します。named client や typed client にすると、外部 API ごとの設定と責務を分けやすくなります。
- タイムアウト、ステータスコード、キャンセルを考慮します。外部 API は必ず成功するとは限らないため、失敗時の retry、fallback、利用者へのエラー応答まで設計します。
- `EnsureSuccessStatusCode()` は 2xx 以外を例外にします。便利ですが、404 や 409 のように業務上意味のある status を個別に扱いたい場合は、自分で status code を判定します。
- request body や response body には個人情報や secret が含まれることがあります。ログへ丸ごと出すのではなく、必要な情報だけを masking して記録します。
- 外部 API 呼び出しは境界です。呼び出し元の業務 service に HTTP の詳細を散らさず、typed client や専用 service に閉じ込めるとテストと変更がしやすくなります。
- 注意: リクエストごとに `new HttpClient()` してソケット枯渇を招く。
- 注意: 1つの長寿命 `HttpClient` を使う場合に DNS 変更へ追従する設定を考えない。
- 注意: ステータスコードを見ずに本文だけ読む。
- 注意: タイムアウトやキャンセルを設定しない。
- 注意: API ごとの設定が `Program.cs` に散らばる。
- 注意: 例外や non-success status の扱いを決めていない。

## コード例

次は学習用の最小例です。実務コードでは、要求ごとに `new HttpClient()` するのではなく、`IHttpClientFactory` または長寿命の `HttpClient` と `SocketsHttpHandler.PooledConnectionLifetime` を使います。

```csharp
// この例では「HttpClient」の要点を最小のコードで確認します。
using var httpClient = new HttpClient();

var response = await httpClient.GetAsync("https://example.com");
response.EnsureSuccessStatusCode();

var body = await response.Content.ReadAsStringAsync();
Console.WriteLine(body.Length);
```

## typed client の例

```csharp
// WeatherApiClient 用の HttpClient を DI に登録します。
builder.Services.AddHttpClient<WeatherApiClient>(client =>
{
    // 外部 API の基準 URL と timeout を client ごとに設定します。
    client.BaseAddress = new Uri("https://api.example.com");
    client.Timeout = TimeSpan.FromSeconds(10);
});

public class WeatherApiClient
{
    // IHttpClientFactory が管理する HttpClient が注入されます。
    private readonly HttpClient httpClient;

    public WeatherApiClient(HttpClient httpClient)
    {
        this.httpClient = httpClient;
    }

    // cancellationToken を渡し、呼び出し元からキャンセルできるようにします。
    public async Task<string> GetAsync(CancellationToken cancellationToken)
        => await httpClient.GetStringAsync("/weather", cancellationToken);
}
```

最初のコード例は `HttpClient` の最小形です。`GetAsync` で request を送り、`EnsureSuccessStatusCode` で 2xx 以外を例外にし、body を文字列として読みます。

typed client の例では、`AddHttpClient<WeatherApiClient>` が設定済みの `HttpClient` を DI に登録します。外部 API ごとの URL や timeout を client に閉じ込めることで、呼び出し側は HTTP の詳細を意識しなくて済みます。

## 実務での使い方

外部 API 連携、社内サービス呼び出し、Webhook、認証サーバー連携で使います。ASP.NET Core では `IHttpClientFactory` を使って named client や typed client を定義することが多いです。

外部 API ごとに typed client を作り、URL、timeout、認証 header、ログ、リトライ方針をまとめます。秘密情報は設定や secret 管理から渡します。

## 関連リンク

- [HttpClient](https://learn.microsoft.com/dotnet/fundamentals/networking/http/httpclient)
- [Guidelines for using HttpClient](https://learn.microsoft.com/dotnet/fundamentals/networking/http/httpclient-guidelines)
- [IHttpClientFactory with .NET](https://learn.microsoft.com/dotnet/core/extensions/httpclient-factory)
