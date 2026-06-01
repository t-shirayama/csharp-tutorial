# LINQ の性能と ToList

## 目的

LINQ の遅延評価、再列挙、`ToList()` の使いどころを性能面から判断できるようにします。

## 前提

- [遅延評価](05_遅延評価.md) を読んでいる
- [LINQ の基本](04_LINQの基本.md) を読んでいる

## 要点

- LINQ は多くの場合、列挙されるまで実行されません。
- 注意: 逆に materiali
- 同じ query を何度も列挙すると、処理も何度も実行されます。
- `ToList()` は結果を確定しますが、メモリを使います。
- 注意: 何でもすぐ `ToList()` してメモリを使う。
- 注意: 逆に materialize せず、同じ query を何度も列挙する。
- 注意: EF Core の query を途中で `ToList()` し、以降をメモリ上で絞り込む。

## コード例

```csharp
// この例では「LINQ の性能と ToList」の要点を最小のコードで確認します。
var expensiveQuery = items.Where(item => IsTarget(item));

var count = expensiveQuery.Count();
var first = expensiveQuery.FirstOrDefault();
```

この例では `IsTarget` が複数回呼ばれる可能性があります。

```csharp
// この例では「LINQ の性能と ToList」の要点を最小のコードで確認します。
var targets = items.Where(item => IsTarget(item)).ToList();

var count = targets.Count;
var first = targets.FirstOrDefault();
```

## 実務での使い方

外部 API、DB、ファイル読み込みの結果に LINQ をかける場合、どこで列挙されるかを確認します。EF Core では `ToListAsync()` の位置が SQL 実行タイミングになります。

ze せず、同じ query を何度も列挙する。

## レビュー観点

- その `ToList()` は必要か。
- 同じ `IEnumerable<T>` を複数回列挙していないか。
- DB で絞るべき処理をメモリ上で行っていないか。

## 関連リンク

- [Classification of standard query operators by manner of execution](https://learn.microsoft.com/dotnet/csharp/linq/get-started/introduction-to-linq-queries)
