# Minimal API と Controller の選び方

## 目的

ASP.NET Core で API を作るときに、Minimal API と Controller のどちらを選ぶか判断できるようにします。

## 前提

- [Minimal API](02_MinimalAPI.md) を読んでいる
- [Controller / MVC](03_ControllerMVC.md) を読んでいる
- [Routing](04_Routing.md) を読んでいる

## 要点

- Minimal API は少ないコードで endpoint を定義できます。小さな API、internal API、BFF、health check、function に近い endpoint で扱いやすいです。
- Controller は関連 action を class にまとめられます。大きめの業務 API、attribute、filter、model binding、複数 action の整理を重視する場合に向いています。
- どちらでも実務 API は作れます。重要なのは、validation、認証認可、OpenAPI、service 分割、test の方針を揃えることです。
- Minimal API は `MapGroup`、extension method、endpoint filter を使うと整理しやすくなります。すべてを `Program.cs` に置き続けると読みづらくなります。
- Controller は構造化しやすい一方で、Controller に業務ロジックを詰めると肥大化します。HTTP の入出力と application service の呼び出しに寄せます。
- team の経験、既存 codebase、API の規模、認証認可や filter の複雑さ、OpenAPI の整備方針で選びます。
- 注意: Minimal API を選ぶ場合も、`Program.cs` が巨大化しないよう group や extension method に分けます。
- 注意: Controller を選ぶ場合も、業務ロジックは Controller ではなく application service に寄せます。
- 注意: validation、error response、既存 pattern を endpoint ごとにばらつかせないようにします。

## 比較表

| 観点 | Minimal API | Controller |
| --- | --- | --- |
| 小さな API | 少ない記述で始めやすい | やや boilerplate が増える |
| 大きな API | group や extension 分割が必要 | class 単位で整理しやすい |
| validation | endpoint filter や明示的な分岐 | model validation と相性がよい |
| filter | endpoint filter | action filter / exception filter など |
| OpenAPI | endpoint ごとの metadata を意識する | attribute と action が対応しやすい |
| team 開発 | 書き方の統一が重要 | 既存 MVC 経験を活かしやすい |

## Minimal API を整理する例

```csharp
public static class ProductEndpoints
{
    public static RouteGroupBuilder MapProductEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/products")
            .WithTags("Products");

        group.MapGet("/{id:int}", GetById);
        group.MapPost("/", Create);

        return group;
    }

    private static async Task<IResult> GetById(int id, IProductService service)
    {
        var product = await service.FindAsync(id);
        return product is null ? Results.NotFound() : Results.Ok(product);
    }

    private static async Task<IResult> Create(CreateProductRequest request, IProductService service)
    {
        var product = await service.CreateAsync(request.Name, request.Price);
        return Results.Created($"/products/{product.Id}", product);
    }
}
```

`Program.cs` では次のように登録します。

```csharp
app.MapProductEndpoints();
```

## Controller を使う例

```csharp
[ApiController]
[Route("api/[controller]")]
public sealed class ProductsController : ControllerBase
{
    private readonly IProductService productService;

    public ProductsController(IProductService productService)
    {
        this.productService = productService;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductResponse>> GetById(int id)
    {
        var product = await productService.FindAsync(id);

        if (product is null)
        {
            return NotFound();
        }

        return Ok(new ProductResponse(product.Id, product.Name, product.Price));
    }
}
```

Minimal API の例では、endpoint 定義を extension method に逃がして `Program.cs` を軽くしています。Controller の例では、constructor injection で service を受け取り、action method が HTTP request を受けて response を返します。どちらの例でも、業務処理は `IProductService` に寄せています。

## 実務での使い方

新規 project では、最初に endpoint の増え方を想像します。数個の internal endpoint なら Minimal API、業務単位で多くの action を持つ外部 API なら Controller が分かりやすいことがあります。既存 project では、周囲の設計に合わせる方が保守しやすいです。

## 関連リンク

- [Minimal API](02_MinimalAPI.md)
- [Controller / MVC](03_ControllerMVC.md)
- [Endpoint Filters](10_EndpointFilters.md)
