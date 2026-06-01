# EF Core 診断

## 目的

EF Core の性能問題や意図しない SQL を調査する基本手順を理解します。

## 前提

- [EF Core クエリ設計](08_EFCoreクエリ設計.md) を読んでいる
- [Change Tracker と Loading Strategy](12_ChangeTrackerとLoadingStrategy.md) を読んでいる

## 要点

- まず生成 SQL と query 回数を確認します。
- `ToQueryString()` は LINQ がどの SQL になるか確認する入口です。
- 本番性能は DB の実行計画、index、データ量も含めて判断します。
- log に secret や個人情報を出さないよう注意します。
- 注意: `ToList()` の位置が早いと、DB ではなくメモリ上で絞り込みや並べ替えを行う原因になります。
- 注意: SQL や index を見ずに LINQ の見た目だけで性能を判断しないようにします。
- 注意: 開発 DB の少量データだけで本番性能を判断すると、実データ量で問題が表面化します。

## コード例

```csharp
// この例では LINQ から生成される SQL を確認します。
var query = dbContext.Products
    .Where(product => product.Price >= 1000m)
    .OrderBy(product => product.Name);

Console.WriteLine(query.ToQueryString());
```

`ToQueryString()` は query を実行せず、生成予定の SQL を文字列として確認します。`ToListAsync()` の前に確認すると、不要な列、意図しない join、where 条件の抜けに気づきやすくなります。

## 調査手順

1. 画面や API の遅い endpoint を特定する。
2. EF Core log または `ToQueryString()` で SQL と query 回数を確認する。
3. DB 側で実行計画を確認する。
4. index、projection、`AsNoTracking()`、pagination、N+1 を見直す。
5. 修正後に同じ条件で再測定する。

## 実務での使い方

性能問題は C# だけでは判断できません。EF Core の LINQ、生成 SQL、DB の実行計画、データ量をつなげて見ます。ログに parameter value を出す設定は便利ですが、個人情報や secret が出る可能性があるため開発環境に限定します。

## 関連リンク

- [Efficient querying](https://learn.microsoft.com/ef/core/performance/efficient-querying)
- [Simple logging](https://learn.microsoft.com/ef/core/logging-events-diagnostics/simple-logging)
