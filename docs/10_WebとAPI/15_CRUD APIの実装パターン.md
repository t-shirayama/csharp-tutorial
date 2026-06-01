# CRUD API の実装パターン

## 目的

Web API でよく作る CRUD endpoint を、DTO、validation、service、status code に分けて実装する流れを理解します。

## 前提

- [ASP.NET Core の構造](01_ASPNETCoreの構造.md) を読んでいる
- [Minimal API](02_MinimalAPI.md) を読んでいる
- [Request / Response](05_RequestResponse.md) を読んでいる
- [Validation](06_Validation.md) を読んでいる

## 要点

- CRUD は create、read、update、delete の基本操作です。実務では「動けばよい」ではなく、request DTO、response DTO、validation、service、status code の責務を分けます。
- `POST` は作成、`GET` は取得、`PUT` は全体更新、`DELETE` は削除に使うのが基本です。URL は `/products` のように resource 名を中心に設計します。
- Entity をそのまま外部へ返さず、API 契約用の response DTO に変換します。DB や domain の変更が API 利用者へ漏れにくくなります。
- 入力値の形式チェックは endpoint 近くで行い、在庫や重複などの業務ルールは service や domain 側で扱います。
- 作成成功は `201 Created`、取得なしは `404 Not Found`、更新成功は `200 OK` または `204 No Content`、削除成功は `204 No Content` がよく使われます。
- endpoint に業務処理を詰め込みすぎると、validation、ログ、認証認可、テストが難しくなります。endpoint は HTTP と application service の橋渡しに寄せます。
- 注意: `POST` 成功時に常に `200 OK` を返すと、作成された resource の場所を API 利用者が判断しにくくなります。
- 注意: Entity をそのまま response にすると、内部 property や循環参照を公開する可能性があります。
- 注意: `404`、`400`、`409` などの使い分け、削除済み resource の扱いを endpoint 間で揃えます。

## DTO を定義する

```csharp
public sealed record CreateProductRequest(string Name, decimal Price);

public sealed record UpdateProductRequest(string Name, decimal Price);

public sealed record ProductResponse(int Id, string Name, decimal Price);
```

## Minimal API の CRUD 例

```csharp
var products = app.MapGroup("/products")
    .WithTags("Products");

products.MapGet("/{id:int}", async (int id, IProductService service) =>
{
    var product = await service.FindAsync(id);

    if (product is null)
    {
        return Results.NotFound();
    }

    var response = new ProductResponse(product.Id, product.Name, product.Price);
    return Results.Ok(response);
});

products.MapPost("/", async (CreateProductRequest request, IProductService service) =>
{
    if (string.IsNullOrWhiteSpace(request.Name))
    {
        return Results.BadRequest("Name is required.");
    }

    if (request.Price < 0)
    {
        return Results.BadRequest("Price must be greater than or equal to 0.");
    }

    var product = await service.CreateAsync(request.Name.Trim(), request.Price);
    var response = new ProductResponse(product.Id, product.Name, product.Price);

    return Results.Created($"/products/{product.Id}", response);
});

products.MapPut("/{id:int}", async (int id, UpdateProductRequest request, IProductService service) =>
{
    if (string.IsNullOrWhiteSpace(request.Name))
    {
        return Results.BadRequest("Name is required.");
    }

    var updated = await service.UpdateAsync(id, request.Name.Trim(), request.Price);

    if (updated is null)
    {
        return Results.NotFound();
    }

    var response = new ProductResponse(updated.Id, updated.Name, updated.Price);
    return Results.Ok(response);
});

products.MapDelete("/{id:int}", async (int id, IProductService service) =>
{
    var deleted = await service.DeleteAsync(id);

    return deleted ? Results.NoContent() : Results.NotFound();
});
```

## service の境界

```csharp
public interface IProductService
{
    Task<Product?> FindAsync(int id);

    Task<Product> CreateAsync(string name, decimal price);

    Task<Product?> UpdateAsync(int id, string name, decimal price);

    Task<bool> DeleteAsync(int id);
}
```

`MapGroup("/products")` は product resource の endpoint をまとめています。`MapGet("/{id:int}")` は route parameter を `int` に制限し、存在しない場合は `404 Not Found` を返します。`MapPost` は入力検証後に service を呼び、作成された resource の URL を `Created` で返します。endpoint は HTTP の入出力を扱い、保存や業務判断は `IProductService` に委ねています。

## 実務での使い方

CRUD は単純に見えますが、status code、validation、権限、同時更新、重複、削除方式などの判断が入ります。最初に endpoint の方針を揃えると、API 利用者にも開発者にも読みやすくなります。永続化が EF Core になる場合も、endpoint から直接 `DbContext` 操作を広げすぎず、責務の境界を意識します。

## 関連リンク

- [Minimal API](02_MinimalAPI.md)
- [Request / Response](05_RequestResponse.md)
- [Validation](06_Validation.md)
- [Create web APIs with ASP.NET Core](https://learn.microsoft.com/aspnet/core/web-api/)
