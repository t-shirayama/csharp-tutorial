# Routing

## 目的

URL と処理を対応付ける routing の基本を理解します。

## 要点

- route template でパスを定義します。
- `{id:int}` のように制約を付けられます。
- REST ではリソース名と HTTP method を組み合わせます。

- 注意: 動詞を URL に入れすぎる。
- 注意: route が衝突する。
- 注意: int 制約などを付けず、想定外の入力が action まで届く。

## コード例

```csharp
// この例では「Routing」の要点を最小のコードで確認します。
app.MapGet("/products/{id:int}", (int id) => Results.Ok(id));
app.MapPost("/products", (CreateProductRequest request) => Results.Created($"/products/1", request));
```

## 実務での使い方

URL は API 契約です。命名、階層、複数形、バージョニング方針をチームで決めます。


## 関連リンク

- [Routing in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/routing)
