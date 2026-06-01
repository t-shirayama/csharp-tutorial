# EF Core の基本

## 目的

Entity Framework Core の役割と基本的な CRUD の流れを理解します。

## 要点

- EF Core は .NET の ORM です。SQL をまったく意識しなくてよい道具ではなく、C# の object 操作と relational database の表操作を橋渡しする layer として理解します。
- C# の Entity と DbContext を通じて DB を扱います。Entity は table の行に対応する業務データ、DbContext は query、変更追跡、保存、transaction の入口になります。
- LINQ が SQL に変換されます。`Where` や `Select` を書いた時点ではまだ DB へ問い合わせず、`ToListAsync` や `FirstOrDefaultAsync` などで実行されることが多いです。
- EF Core の便利さは、生成される SQL を確認できて初めて安全に使えます。N+1、不要な全列取得、早すぎる `ToList` は性能問題につながるため、query の形を意識します。
- `DbContext` は通常 request 単位で扱い、Singleton にしません。長く使い回すと変更追跡が膨らみ、古い状態やスレッド安全性の問題を招きます。
- 更新処理では、どこまでを1つの transaction とするかを考えます。複数 table の更新や外部処理との組み合わせでは、失敗時にどこまで戻せるかを設計します。

- 注意: LINQ がすべてメモリ上で動くと思い込む。
- 注意: `ToList` の位置が早すぎて全件取得する。
- 注意: DbContext を Singleton にする。

## コード例

```csharp
// この例では「EF Core の基本」の要点を最小のコードで確認します。
var products = await dbContext.Products
    .Where(product => product.Price >= 1000m)
    .ToListAsync();
```

## 実務での使い方

業務アプリの CRUD、検索、集計でよく使います。便利ですが、生成 SQL、N+1、トラッキング、トランザクションを理解する必要があります。


## 関連リンク

- [EF Core](https://learn.microsoft.com/ef/core/)
