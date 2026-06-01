# OpenAPI

## 目的

API 仕様を機械可読に表現する OpenAPI の基本と、利用者との契約として整備する観点を理解します。

## 要点

- OpenAPI は endpoint、request、response、認証方式を記述します。
- .NET 10 では ASP.NET Core の組み込み OpenAPI 機能として `AddOpenApi` と `MapOpenApi` を使えます。
- Swagger UI で対話的に確認したい場合は、Swashbuckle などの追加パッケージを使います。
- 仕様は endpoint 一覧ではなく、request、response、status code、認証方式、利用例を共有する契約です。
- 成功 response だけでなく、`400`、`401`、`403`、`404`、`409`、`500` などの error response も仕様に含めます。
- DTO の property 名、必須項目、型、nullable、例を揃えます。
- OpenAPI document や Swagger UI の公開範囲を制御し、内部 endpoint や secret 情報を production に出さないようにします。
- 注意: 実装と仕様、nullable / required、version、client 生成がずれると API 利用者の障害につながります。
- 注意: エラーレスポンスや認証が必要な endpoint の説明を OpenAPI に含めます。
- 注意: OpenAPI document や Swagger UI を production に無条件公開しないようにします。

## .NET 10 の組み込み OpenAPI 例

```csharp
// この例では「OpenAPI」の要点を最小のコードで確認します。
builder.Services.AddOpenApi();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
```

`MapOpenApi` は OpenAPI document を公開する endpoint を追加します。公開範囲を誤ると内部仕様を外部へ見せてしまうため、通常は Development などに限定します。

## Swashbuckle を使う場合の例

```csharp
// この例では「OpenAPI」の要点を最小のコードで確認します。
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

.NET 9 以降では Swashbuckle は既定では含まれません。Swagger UI が必要な場合や既存プロジェクトが Swashbuckle 前提の場合に、追加パッケージとして採用します。

## endpoint metadata を付ける例

```csharp
app.MapGet("/products/{id:int}", async (int id, IProductService service) =>
    {
        var product = await service.FindAsync(id);
        return product is null ? Results.NotFound() : Results.Ok(product);
    })
    .WithName("GetProductById")
    .WithTags("Products")
    .Produces<ProductResponse>(StatusCodes.Status200OK)
    .ProducesProblem(StatusCodes.Status404NotFound)
    .ProducesProblem(StatusCodes.Status500InternalServerError);
```

## request と response を明示する例

```csharp
app.MapPost("/products", async (CreateProductRequest request, IProductService service) =>
    {
        var product = await service.CreateAsync(request.Name, request.Price);
        var response = new ProductResponse(product.Id, product.Name, product.Price);

        return Results.Created($"/products/{product.Id}", response);
    })
    .WithName("CreateProduct")
    .WithTags("Products")
    .Accepts<CreateProductRequest>("application/json")
    .Produces<ProductResponse>(StatusCodes.Status201Created)
    .ProducesProblem(StatusCodes.Status400BadRequest)
    .ProducesProblem(StatusCodes.Status409Conflict);
```

`AddOpenApi` は OpenAPI document を生成するための service を登録します。`MapOpenApi` は document を公開する endpoint を追加します。`if (app.Environment.IsDevelopment())` で囲むことで、開発環境だけで確認できるようにしています。Swashbuckle の例では、document 生成に加えて Swagger UI を使えるようにしています。

`.Produces<ProductResponse>(StatusCodes.Status200OK)` は、成功時の response body と status code を OpenAPI に伝えます。`.ProducesProblem` は error response が `ProblemDetails` 形式であることを示します。`WithName` は endpoint 名、`WithTags` は OpenAPI 上の分類に使われます。

## 実務での使い方

フロントエンド連携、外部公開 API、テスト、クライアントコード生成で使います。公開前にレスポンス例やエラー形式も確認します。

仕様が実装とずれると障害につながるため、PR では endpoint の実装だけでなく OpenAPI の見え方も確認します。公開 API では、breaking change の有無も OpenAPI diff で確認します。

## 関連リンク

- [OpenAPI support in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/openapi/overview)
- [Get started with Swashbuckle and ASP.NET Core](https://learn.microsoft.com/aspnet/core/tutorials/getting-started-with-swashbuckle)
