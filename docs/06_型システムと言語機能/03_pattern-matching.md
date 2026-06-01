# pattern matching

## 目的

値の形や型に応じて分岐する pattern matching を理解します。

## 要点

- `is` で型や条件を判定できます。null チェック、型チェック、property の値による分類を1つの構文で表せます。
- `switch expression` と組み合わせると分岐が読みやすくなります。入力値を分類して表示名、HTTP status、処理方針へ変換する場面で便利です。
- null チェックにも `is null` / `is not null` を使えます。nullable reference types と組み合わせると、compiler が null チェック済みと判断しやすくなります。
- pattern matching は条件分岐を短くできますが、業務ルールを詰め込みすぎると読みにくくなります。分岐が増えたら method、strategy、polymorphism への分割を検討します。
- `_` は最後の受け皿です。想定外の値を静かに処理してよいのか、例外やエラーとして検出すべきなのかを考えて使います。

## コード例

```csharp
// この例では「pattern matching」の要点を最小のコードで確認します。
static string Describe(object value) => value switch
{
    null => "null",
    int number when number > 0 => "正の整数",
    string text when text.Length > 0 => "空でない文字列",
    _ => "その他"
};
```

## 業務ステータス分類の例

```csharp
static string GetDisplayStatus(OrderStatus status) => status switch
{
    OrderStatus.Draft => "下書き",
    OrderStatus.Paid => "支払い済み",
    OrderStatus.Shipped => "発送済み",
    OrderStatus.Canceled => "キャンセル済み",
    _ => throw new ArgumentOutOfRangeException(nameof(status), status, "未知の注文ステータスです。")
};

public enum OrderStatus
{
    Draft,
    Paid,
    Shipped,
    Canceled
}
```


## 実務での使い方

ステータス判定、型ごとの処理、入力値の分類で使います。複雑になりすぎる場合は、クラス設計や polymorphism で解けないか検討します。

状態ごとの処理が大きくなった場合は、[Factory / Strategy / Adapter](../07_設計と実務パターン/06_FactoryStrategyAdapter.md) の Strategy も候補になります。

## 関連リンク

- [Pattern matching](https://learn.microsoft.com/dotnet/csharp/fundamentals/functional/pattern-matching)
