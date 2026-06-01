# partial 型とネスト型

## 目的

`partial` 型、partial method、nested type の基本と、実務での使いどころを理解します。

## 前提

- [class と object](01_classとobject.md) を読んでいる

## 要点

- `partial` は 1 つの型定義を複数ファイルに分ける仕組みです。
- source generator や UI designer、生成コードとの分離で使われます。
- nested type は型の中に定義する型です。
- 注意: class が大きいからという理由だけで partial に分ける。
- 注意: partial 定義が複数ファイルに散らばり、責務が見えなくなる。
- 注意: nested type を多用して参照しにくくする。

## コード例

```csharp
// この例では「partial 型とネスト型」の要点を最小のコードで確認します。
public partial class ReportBuilder
{
    public string BuildHeader() => "Report";
}

public partial class ReportBuilder
{
    public string BuildBody() => "Body";
}
```

## ネスト型の例

```csharp
// この例では「partial 型とネスト型」の要点を最小のコードで確認します。
public class Order
{
    public enum Status
    {
        Draft,
        Submitted,
        Cancelled
    }
}

var status = Order.Status.Submitted;
```

`ReportBuilder` は 2 つの partial class 定義に分かれていますが、compile 後は 1 つの class として扱われます。`Order.Status` は `Order` に強く関係する enum を内側に置いた例です。

## 実務での使い方

生成コードと手書きコードを分けるときに partial を使います。通常の業務 class をただ分割する目的で使うと、定義が散らばって読みにくくなります。nested type は外側の型と密接な関係がある場合に限定します。

## 関連リンク

- [Partial classes and methods](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods)
- [Nested types](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/nested-types)
