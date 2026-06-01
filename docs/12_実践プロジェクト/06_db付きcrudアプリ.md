# DB 付き CRUD アプリ

## 目的

EF Core と ASP.NET Core を使って、DB 保存を含む CRUD アプリを作ります。

## 作るもの

商品やメモなどのデータを DB に保存し、作成、取得、更新、削除できる API です。

## 学習ポイント

- DbContext / Entity
- Migration
- CRUD endpoint
- Transaction
- N+1 問題の確認
- projection と `AsNoTracking()`
- Migration と rollback の考え方

## 実装ステップ

1. entity と response DTO を分ける。
2. `AppDbContext` を作り、`DbSet<Product>` を定義する。
3. `dotnet ef migrations add InitialCreate` と `dotnet ef database update` で DB を作る。
4. 作成、一覧、詳細、更新、削除 endpoint を実装する。
5. 一覧は `AsNoTracking()` と DTO projection を使う。
6. 更新では存在確認、入力 validation、同時更新の方針を決める。
7. 削除は物理削除か論理削除かを選び、理由を README に残す。
8. 主要 query の SQL を `ToQueryString()` で確認する。
9. service test と DB integration test を追加する。

## 一覧 query の例

```csharp
app.MapGet("/products", async (AppDbContext dbContext, CancellationToken cancellationToken) =>
{
    var products = await dbContext.Products
        .AsNoTracking()
        .OrderBy(product => product.Name)
        .Select(product => new ProductResponse(
            product.Id,
            product.Name,
            product.Price))
        .Take(50)
        .ToListAsync(cancellationToken);

    return Results.Ok(products);
});
```

一覧 endpoint では更新しないため `AsNoTracking()` を使います。`Select` で entity ではなく response DTO に projection し、API に必要な列だけを取得します。`Take(50)` は無制限取得を防ぐための上限です。実務では page number や cursor を request として受け取ります。

## 完了条件

- Migration で DB を作成できる。
- CRUD API が動作する。
- validation とエラーハンドリングがある。
- `dotnet test` で主要ロジックを確認できる。
- 一覧 query で projection、page 上限、`AsNoTracking()` を使っている。
- 主要 query の生成 SQL を確認している。
