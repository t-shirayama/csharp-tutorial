# record と値の等価性

## 目的

`record` が値の等価性を持つことを理解し、DTO や値オブジェクトで使い分けます。

## 前提

- [record](../02_オブジェクト指向/04_record.md) を読んでいる
- [値オブジェクト](../02_オブジェクト指向/08_値オブジェクト.md) を読んでいる

## 要点

- `record` は同じ値を持つ object を等しいものとして扱いやすいです。DTO、API response、query result、設定値のように値のまとまりを表す型に向いています。
- `with` 式で一部だけ変えた copy を作れます。元の値を壊さずに変更後の snapshot を作りたい場合に便利です。
- Entity のように ID と lifecycle が重要なものには class が向く場合があります。同じ property 値でも別の実体として扱いたいなら、record の値の等価性は合わないことがあります。
- `record` は不変設計と相性がよいですが、mutable property を増やすと利点が薄れます。作成後に変えたい状態が多いなら class も検討します。
- `record struct` は小さな値オブジェクトの候補です。ただし、大きい値や copy cost が気になる値には慎重に使います。

- 注意: Entity に record を使い、同一性の意味が曖昧になる。
- 注意: `with` で作った copy が別 object であることを忘れる。
- 注意: mutable property を増やして record の利点を薄める。

## コード例

```csharp
// record は、同じプロパティ値を持つ object を等しいものとして扱いやすい型です。
public record TodoItem(int Id, string Title, bool Done);

// 変更前の TODO を作ります。
var todo = new TodoItem(1, "Learn C#", false);

// with 式は元の値を壊さず、一部だけ変更した copy を作ります。
var completed = todo with { Done = true };
```

`TodoItem` は `Id`、`Title`、`Done` の値で表される record です。`with` 式で `Done` だけを `true` にした新しい object を作っています。元の `todo` は変更されません。

値のスナップショットや API response には向いていますが、DB entity のように同一性や変更追跡が重要な型では慎重に選びます。

## 実務での使い方

API response、query result、設定値、値オブジェクトなどに使います。DB entity に使う場合は ORM の制約や変更追跡との相性を確認します。

`class`、`record`、`record struct`、`struct` の使い分けは [型設計の選び方](17_型設計の選び方.md) で扱います。

## 関連リンク

- [Records](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/record)
