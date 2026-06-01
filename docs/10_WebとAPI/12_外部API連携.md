# 外部 API 連携

## 目的

ASP.NET Core アプリから外部 API を呼ぶときの責務分割、typed client、設定、エラー処理を理解します。

## 前提

- [HttpClient と HttpClientFactory](../04_標準ライブラリ/06_HttpClient.md) を読んでいる
- [設定管理と IOptions](../07_設計と実務パターン/10_IOptionsとConfiguration.md) を読んでいる

## 要点

- 外部 API ごとに typed client を作ります。
- BaseUrl、timeout、API key は設定から渡します。
- HTTP status、timeout、retry、ログ、監視を設計します。
- 外部 API の response をそのまま内部 model にしない方が安全です。
- `EnsureSuccessStatusCode` だけに頼ると、status code ごとの扱いを設計しにくい場合があります。`404`、`429`、`5xx`、timeout をどう扱うか決めます。
- retry は万能ではありません。冪等な操作か、相手 API の rate limit、二重登録の可能性を確認します。
- 注意: `new HttpClient()` を各所で直接作らず、`IHttpClientFactory` や typed client を使います。
- 注意: API key や token をコードやログに出さず、user secrets や環境変数から渡します。
- 注意: non-success status をすべて同じ扱いにすると、retry 可否や利用者への返し方を判断しにくくなります。

## 構成例

```text
WeatherApiClient
WeatherApiOptions
WeatherResponse
WeatherService
```

## options を定義する

```csharp
public sealed class WeatherApiOptions
{
    public string BaseUrl { get; init; } = string.Empty;

    public string ApiKey { get; init; } = string.Empty;

    public int TimeoutSeconds { get; init; } = 10;
}
```

## typed client を実装する

```csharp
public sealed class WeatherApiClient
{
    private readonly HttpClient httpClient;
    private readonly WeatherApiOptions options;
    private readonly ILogger<WeatherApiClient> logger;

    public WeatherApiClient(
        HttpClient httpClient,
        IOptions<WeatherApiOptions> options,
        ILogger<WeatherApiClient> logger)
    {
        this.httpClient = httpClient;
        this.options = options.Value;
        this.logger = logger;
    }

    public async Task<WeatherSummary?> GetCurrentAsync(string city, CancellationToken cancellationToken)
    {
        var path = $"/current?city={Uri.EscapeDataString(city)}";

        using var request = new HttpRequestMessage(HttpMethod.Get, path);
        request.Headers.Add("X-Api-Key", options.ApiKey);

        using var response = await httpClient.SendAsync(request, cancellationToken);

        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }

        if (!response.IsSuccessStatusCode)
        {
            logger.LogWarning("Weather API failed with status {StatusCode}", response.StatusCode);
            throw new ExternalApiException("Weather API request failed.");
        }

        var dto = await response.Content.ReadFromJsonAsync<WeatherResponse>(cancellationToken);

        return dto is null ? null : new WeatherSummary(dto.City, dto.TemperatureCelsius);
    }
}
```

## DI に登録する

```csharp
builder.Services.Configure<WeatherApiOptions>(
    builder.Configuration.GetSection("WeatherApi"));

builder.Services.AddHttpClient<WeatherApiClient>((serviceProvider, client) =>
{
    var options = serviceProvider.GetRequiredService<IOptions<WeatherApiOptions>>().Value;

    client.BaseAddress = new Uri(options.BaseUrl);
    client.Timeout = TimeSpan.FromSeconds(options.TimeoutSeconds);
});
```

## appsettings の例

```json
{
  "WeatherApi": {
    "BaseUrl": "https://api.example.com",
    "TimeoutSeconds": 10
  }
}
```

API key は `appsettings.json` に直書きせず、user secrets や環境変数で渡します。

`WeatherApiClient` は外部 API 呼び出しの詳細を隠す class です。`HttpRequestMessage` に API key header を付け、`SendAsync` で呼び出します。`404` は「天気情報なし」として `null` を返し、それ以外の失敗 status はログを出して例外にしています。

最後に外部 DTO の `WeatherResponse` から内部向けの `WeatherSummary` へ変換しています。外部 API の response DTO を domain model として使い回さないことで、外部仕様変更の影響を閉じ込めやすくなります。

## 実務での使い方

外部 API 障害は自アプリの障害として見えます。失敗時の fallback、利用者に返す status、監視アラート、retry 可能性を事前に決めます。

timeout、retry、rate limit、監視、ログ、fallback、secret 管理を最初から設計します。API key や token をログに出さないようにし、request / response body に個人情報が含まれる場合は記録範囲を制限します。

## 関連リンク

- [Make HTTP requests using IHttpClientFactory](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests)
