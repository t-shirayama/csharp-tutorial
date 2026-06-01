# EF Core N+1 問題

## 症状

一覧画面や API が遅い、DB への SQL が大量に発行される、同じような `SELECT` が繰り返し出ます。

## 主な原因

- navigation property を loop の中で遅延 loading している。
- 必要な関連 data を `Include` や projection で取得していない。
- SQL log を見ずに LINQ の見た目だけで判断している。

## 確認コマンド

```powershell
dotnet run
dotnet test
```

## 対処例

```csharp
// この例では必要な列だけを projection し、一覧用 DTO として取得します。
var orders = await dbContext.Orders
    .AsNoTracking()
    .Select(order => new OrderSummary(
        order.Id,
        order.Customer.Name,
        order.Items.Count))
    .ToListAsync(cancellationToken);
```

`Select` で一覧に必要な形へ直接変換します。`AsNoTracking` は読み取り専用 query で Change Tracker の負荷を避けるために使います。SQL がどうなるかは `ToQueryString()` や log で確認します。

## 解決手順

1. SQL log を有効にし、同じ query が繰り返されていないか確認する。
2. 一覧に必要な列と関連 data を洗い出す。
3. `Include` か projection のどちらが適切か判断する。
4. 読み取り専用なら `AsNoTracking` を検討する。
5. 実行計画と index を確認する。

## 関連リンク

- [N+1 問題](../09_データアクセス/07_N+1問題.md)
- [EF Core クエリ設計](../09_データアクセス/08_EFCoreクエリ設計.md)
- [Change Tracker と Loading Strategy](../09_データアクセス/12_ChangeTrackerとLoadingStrategy.md)
- [EF Core 診断](../09_データアクセス/13_EFCore診断.md)
