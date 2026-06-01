# struct

## 目的

値型を自分で定義する `struct` の基本と、class との使い分けを理解します。

## 前提

- [class と object](01_classとobject.md) を読んでいる
- [record](04_record.md) を読んでいる

## 要点

- `struct` は値型です。代入や引数渡しで値がコピーされます。
- 小さく、不変で、値そのものに意味がある型に向いています。
- 大きいデータや状態変更が多い型は class を優先します。
- 注意: 大きな struct を作り、コピーコストを増やす。
- 注意: 変更可能な property を持たせ、コピー後の変更で混乱する。
- 注意: `default` 値で不正な状態が作られることを忘れる。

## コード例

```csharp
// この例では「struct」の要点を最小のコードで確認します。
public readonly struct Money
{
    public Money(decimal amount, string currency)
    {
        if (amount < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount));
        }

        Amount = amount;
        Currency = currency;
    }

    public decimal Amount { get; }
    public string Currency { get; }
}

var price = new Money(1200m, "JPY");
Console.WriteLine($"{price.Amount} {price.Currency}");
```

`readonly struct` にすると、作成後に値を変えない意図を型で表せます。`Money` は金額と通貨の小さな値なので struct の候補になります。ただし、通貨換算や丸めなどの複雑な業務ルールを多く持つ場合は、class や record も検討します。

## 実務での使い方

座標、範囲、識別子、少量の数値ペアのように、小さくコピーしても負担が少ない値に使います。実務では、まず class / record で十分なことも多いため、性能や値型の意味が必要な場合に選びます。

## 関連リンク

- [Structure types](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/struct)
- [Choosing between class and struct](https://learn.microsoft.com/dotnet/standard/design-guidelines/choosing-between-class-and-struct)
