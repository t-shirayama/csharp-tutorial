# Status Code と ProblemDetails

## 目的

Web API の結果を HTTP status code と `ProblemDetails` で一貫して表現できるようにします。

## 前提

- [Request / Response](05_RequestResponse.md) を読んでいる
- [Validation](06_Validation.md) を読んでいる
- [グローバルエラーハンドリング](../07_設計と実務パターン/12_グローバルエラーハンドリング.md) を読んでいる

## 要点

- status code は API 利用者に処理結果を伝える契約です。成功、入力ミス、認証失敗、権限不足、競合、サーバーエラーを区別します。
- `400 Bad Request` は request の形式や基本 validation の失敗、`404 Not Found` は resource が存在しない場合に使います。
- `401 Unauthorized` は認証が必要または token が無効、`403 Forbidden` は認証済みだが権限がない場合に使います。
- `409 Conflict` は重複や同時更新など、現在の resource 状態と request が衝突する場合に使います。
- `ProblemDetails` は HTTP API のエラーを標準的な JSON 形式で返すための型です。`type`、`title`、`status`、`detail`、`instance` などを持ちます。
- エラー形式が endpoint ごとにばらつくと、client 側の処理が複雑になります。API 全体で `ProblemDetails` を基本にすると扱いやすくなります。
- 注意: validation 失敗、認証失敗、権限不足、競合、想定外例外をすべて `500` や同じ response にしないようにします。
- 注意: `404` と `403` の使い分けでは、resource 存在を漏らすリスクも考えます。
- 注意: stack trace、内部 ID、secret を error response に出さず、詳細はログ側に残します。

## よく使う status code

| status | 使う場面 |
| --- | --- |
| `200 OK` | 取得、更新などが成功し body を返す |
| `201 Created` | resource 作成成功 |
| `204 No Content` | 削除や body 不要の更新成功 |
| `400 Bad Request` | request が不正 |
| `401 Unauthorized` | 認証が必要、または認証情報が無効 |
| `403 Forbidden` | 認証済みだが権限がない |
| `404 Not Found` | resource が見つからない |
| `409 Conflict` | 重複や同時更新の衝突 |
| `422 Unprocessable Entity` | 形式は正しいが意味的に処理できない |
| `500 Internal Server Error` | 想定外の server error |

## ProblemDetails を返す例

```csharp
app.MapPost("/products", (CreateProductRequest request) =>
{
    if (string.IsNullOrWhiteSpace(request.Name))
    {
        return Results.Problem(
            title: "Validation failed",
            detail: "Name is required.",
            statusCode: StatusCodes.Status400BadRequest);
    }

    return Results.Created("/products/1", new ProductResponse(1, request.Name, request.Price));
});
```

## 競合を表す例

```csharp
app.MapPost("/products", async (CreateProductRequest request, IProductService service) =>
{
    var exists = await service.ExistsByNameAsync(request.Name);

    if (exists)
    {
        return Results.Problem(
            title: "Product already exists",
            detail: $"Product name '{request.Name}' is already used.",
            statusCode: StatusCodes.Status409Conflict);
    }

    var product = await service.CreateAsync(request.Name, request.Price);
    return Results.Created($"/products/{product.Id}", product);
});
```

`Results.Problem` は `ProblemDetails` 形式の response を作ります。`statusCode` で HTTP status を指定し、`title` には分類しやすい短い見出し、`detail` には利用者が次に何を直せばよいか分かる説明を書きます。重複の例では、request の形式は正しいため `400` ではなく、resource 状態との衝突として `409` を返しています。

## 実務での使い方

API 利用者は status code と error body を見て retry、再ログイン、入力修正、問い合わせなどを判断します。ログには詳細を残しつつ、response には秘密情報や stack trace を出さないようにします。グローバル例外処理でも `ProblemDetails` に揃えると、想定外のエラー形式も統一できます。

## 関連リンク

- [Request / Response](05_RequestResponse.md)
- [Validation](06_Validation.md)
- [Handle errors in ASP.NET Core web APIs](https://learn.microsoft.com/aspnet/core/web-api/handle-errors)
