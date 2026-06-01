# record

## 目的

`record` を使って、値の等価性を持つデータ中心の型を表現できるようにします。

## 前提

- [class と object](01_classとobject.md) を読んでいる
- [プロパティとメソッド](02_プロパティとメソッド.md) を読んでいる

## 要点

- `record` は値の内容で等価性を比較しやすい型です。
- DTO、設定値、値オブジェクトのように「値そのもの」が重要な型で候補になります。
- Entity のように ID と状態変化が重要な型では、通常 class を優先します。
- `with` 式で一部の値だけ変えた新しい object を作れます。
- 注意: Entity を record にして、ID や状態変化の意味を曖昧にする。
- 注意: `with` 式が元 object を変更すると思う。
- 注意: mutable property を増やして、record の分かりやすさを失う。

## コード例

```csharp
// この例では「record」の値の等価性と with 式を確認します。
public record Money(decimal Amount, string Currency);

var first = new Money(1000m, "JPY");
var second = new Money(1000m, "JPY");

Console.WriteLine(first == second);

// with 式は既存の値を直接変更せず、新しい値を作ります。
var discounted = first with { Amount = 800m };
Console.WriteLine(discounted);
```

`Money` は金額と通貨が同じなら同じ値として扱いたい型です。`record` は constructor、property、値の等価性、`ToString` などを簡潔に用意します。`with` 式は immutable な設計と相性がよく、元の `first` を壊さず別の値を作れます。

## class との使い分け

| 型 | 向いているもの | 判断の目安 |
| --- | --- | --- |
| class | Entity、service、状態を持つ object | ID や lifecycle が重要。 |
| record class | DTO、値オブジェクト、設定値 | 値の内容で比較したい。 |
| record struct | 小さく immutable な値型 | allocation を避けたいが、値型の制約を理解している。 |

## 実務での使い方

API request / response、設定値、イベントメッセージ、値オブジェクトでよく使います。EF Core の Entity に使う場合は、tracking、constructor、変更検知との相性を確認します。

## 関連リンク

- [Records](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/record)
- [Classes and structs](https://learn.microsoft.com/dotnet/csharp/fundamentals/object-oriented/)
