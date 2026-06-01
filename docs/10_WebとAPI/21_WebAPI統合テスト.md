# Web API 統合テスト

## 目的

ASP.NET Core の Web API を HTTP 経由でテストし、status code と response body を検証する基本を理解します。

## 前提

- [CRUD API の実装パターン](15_CRUD APIの実装パターン.md) を読んでいる
- [プロジェクト作成と実行](../00_環境構築/03_プロジェクト作成と実行.md) を読んでいる
- [テスト戦略](../08_テストと品質/13_テスト戦略.md) を読んでいる

## 要点

- Web API の統合テストでは、実際の HTTP request に近い形で endpoint、routing、model binding、middleware、serialization をまとめて確認します。
- ASP.NET Core では `WebApplicationFactory<TEntryPoint>` を使うと、test server 上で API を起動して `HttpClient` から呼び出せます。
- unit test は service や domain の小さなルールを確認し、integration test は endpoint と framework のつながりを確認します。役割を分けます。
- DB、認証、外部 API はテスト用に差し替えることがあります。production の DB や外部 API を直接叩く test は不安定で危険です。
- test では status code だけでなく、response body、header、`ProblemDetails` の内容も確認します。
- 認証が必要な API では、test 用 authentication handler を使うか、token 発行を含む test 方針を決めます。
- 注意: production DB や外部 API を統合テストから直接呼ばないようにします。
- 注意: 認証認可を test で無効化したままにせず、保護されていることも確認します。
- 注意: test data の初期化と後片付けを決め、unit test と integration test の責務を分けます。

## package を追加する

```powershell
dotnet add tests/SampleApp.Api.Tests/SampleApp.Api.Tests.csproj package Microsoft.AspNetCore.Mvc.Testing
```

## 最小の統合テスト

```csharp
using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace SampleApp.Api.Tests;

public class ProductsApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient client;

    public ProductsApiTests(WebApplicationFactory<Program> factory)
    {
        client = factory.CreateClient();
    }

    [Fact]
    public async Task GetProduct_ReturnsNotFound_WhenProductDoesNotExist()
    {
        var response = await client.GetAsync("/products/999999");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task CreateProduct_ReturnsCreated()
    {
        var request = new CreateProductRequest("Keyboard", 12000m);

        var response = await client.PostAsJsonAsync("/products", request);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var body = await response.Content.ReadFromJsonAsync<ProductResponse>();
        Assert.NotNull(body);
        Assert.Equal("Keyboard", body.Name);
    }
}
```

## Program class を test から見えるようにする

Minimal API の `Program.cs` が top-level statements の場合、test project から entry point を参照しやすくするため、API project 側に次を追加することがあります。

```csharp
public partial class Program
{
}
```

## test 用に service を差し替える考え方

```csharp
public sealed class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // production の外部 API client や DB を、test 用実装へ差し替えます。
            services.AddSingleton<IProductService, FakeProductService>();
        });
    }
}
```

`WebApplicationFactory<Program>` は API を test server として起動します。`factory.CreateClient()` で取得した `HttpClient` は、実際の network ではなく test server に request を送ります。`GetProduct_ReturnsNotFound_WhenProductDoesNotExist` は存在しない ID に対して `404` を期待し、`CreateProduct_ReturnsCreated` は `POST` の結果として `201 Created` と response body を確認しています。

## 実務での使い方

routing、middleware、認証認可、serialization、validation、error response は unit test だけでは漏れやすい領域です。重要な API では、正常系、validation error、認証なし、権限不足、not found、conflict を統合テストで押さえると安心です。DB を使う場合は Testcontainers や in-memory DB の採用方針を決めます。

## 関連リンク

- [Integration tests in ASP.NET Core](https://learn.microsoft.com/aspnet/core/test/integration-tests)
- [プロジェクト作成と実行](../00_環境構築/03_プロジェクト作成と実行.md)
- [Testcontainers](../08_テストと品質/10_Testcontainers.md)
