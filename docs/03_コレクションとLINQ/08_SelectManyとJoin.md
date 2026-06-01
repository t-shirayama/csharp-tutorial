# SelectMany と Join

## 目的

入れ子のコレクションを平坦化したり、複数コレクションを関連付けたりできるようにします。

## 前提

- [LINQ の基本](04_LINQの基本.md) を読んでいる
- [GroupBy と集計](06_GroupByと集計.md) を読んでいる

## 要点

- `SelectMany` は複数の内側コレクションを1つの列に平坦化します。
- `Join` はキーが一致する要素を結合します。
- 実務では読みやすさのため、複雑な LINQ を途中変数へ分けます。
- 注意: `Select` で `IEnumerable<IEnumerable<T>>` を作ってしまう。
- 注意: `Join` より `Dictionary` の方が読みやすい場面で無理に LINQ を使う。
- 注意: 複雑な anonymous type が続き、意図が読めなくなる。

## SelectMany の例

```csharp
// この例では「SelectMany と Join」の要点を最小のコードで確認します。
var orders = customers
    .SelectMany(customer => customer.Orders)
    .ToList();
```

## Join の例

```csharp
// この例では「SelectMany と Join」の要点を最小のコードで確認します。
var result = orders.Join(
    customers,
    order => order.CustomerId,
    customer => customer.Id,
    (order, customer) => new { order.Id, customer.Name });
```

## 実務での使い方

CSV 明細の展開、親子データの集計、メモリ上の小さなマスタ結合などで使います。DB では EF Core が SQL に変換できるかも意識します。

## 関連リンク

- [Enumerable.SelectMany Method](https://learn.microsoft.com/dotnet/api/system.linq.enumerable.selectmany)
- [Enumerable.Join Method](https://learn.microsoft.com/dotnet/api/system.linq.enumerable.join)
