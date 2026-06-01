# TODO Web API

## 目的

ASP.NET Core を使って、TODO を管理する Web API を作ります。

## 作るもの

TODO の作成、一覧取得、完了更新、削除ができる API です。

## 学習ポイント

- Minimal API または Controller
- DI による service 登録
- Options による設定管理
- ILogger による構造化ログ
- DTO
- validation
- ProblemDetails によるエラーレスポンス
- OpenAPI

## 確認コマンド

```powershell
dotnet new webapi -n TodoApi
dotnet run
```

## 実装ステップ

1. `TodoApi` project を作り、OpenAPI で起動確認する。
2. `TodoItem`、`CreateTodoRequest`、`UpdateTodoRequest`、`TodoResponse` を分ける。
3. `ITodoService` と `TodoService` を作り、最初は memory collection に保存する。
4. `GET /todos`、`POST /todos`、`PUT /todos/{id}/complete`、`DELETE /todos/{id}` を実装する。
5. request validation を追加し、空の title や長すぎる title を `400 Bad Request` にする。
6. `ILogger<TodoService>` で作成、完了、削除を構造化ログに出す。
7. 想定外エラーを ProblemDetails で返す。
8. service の unit test と API の integration test を追加する。

## 最小の endpoint 例

```csharp
app.MapPost("/todos", async (
    CreateTodoRequest request,
    ITodoService service,
    ILoggerFactory loggerFactory,
    CancellationToken cancellationToken) =>
{
    if (string.IsNullOrWhiteSpace(request.Title))
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            [nameof(request.Title)] = ["Title is required."]
        });
    }

    var todo = await service.CreateAsync(request, cancellationToken);
    var logger = loggerFactory.CreateLogger("TodoEndpoints");

    logger.LogInformation("Todo created. TodoId: {TodoId}", todo.Id);

    return Results.Created($"/todos/{todo.Id}", todo);
});
```

endpoint は request、service、logger、`CancellationToken` を DI から受け取ります。validation で入力を早く止め、service に業務処理を渡し、成功したら `201 Created` を返します。ログには title そのものではなく `TodoId` を出し、個人情報や長い本文を残さないようにします。

## 完了条件

- `GET /todos` で一覧取得できる。
- `POST /todos` で作成できる。
- `PUT /todos/{id}` で完了状態を更新できる。
- TODO の処理を service に分け、DI で呼び出せる。
- 重要な操作が構造化ログとして出力される。
- 入力エラーと想定外エラーのレスポンス形式が統一されている。
- OpenAPI で API を確認できる。
- `dotnet test` で service と主要 endpoint の検証が通る。

## 設計観点

- [DI コンテナの実装](../07_設計と実務パターン/09_DIコンテナの実装.md) を参考に、TODO service を Scoped で登録する。
- [設定管理と IOptions](../07_設計と実務パターン/10_IOptionsとConfiguration.md) を参考に、ページサイズなどの設定を Options として扱う。
- [ログ設計と構造化ログ](../07_設計と実務パターン/04_ログ設計.md) を参考に、`TodoId` などの業務 ID をログに含める。
- [グローバルエラーハンドリング](../07_設計と実務パターン/12_グローバルエラーハンドリング.md) を参考に、エラーレスポンスを ProblemDetails で統一する。
