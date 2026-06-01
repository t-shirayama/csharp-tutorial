# static とインスタンス

## 目的

`static` を使うべき場面と、インスタンスとして扱うべき場面を判断できるようにします。

## 前提

- [class と object](01_classとobject.md) を読んでいる
- [interface](05_interface.md) を読んでいる

## 要点

- `static` member は型そのものに属します。
- インスタンス member は個別の object に属します。
- 状態や外部依存を持つ処理は、安易に `static` にしない方がテストしやすいです。
- 注意: 便利だからという理由で何でも `static` にする。
- 注意: `static` mutable state を共有してテストが不安定になる。
- 注意: DI で差し替えたい依存を `static` method 内で直接作る。

## static が向く例

```csharp
// この例では「static とインスタンス」の要点を最小のコードで確認します。
public static class TaxCalculator
{
    public static decimal AddTax(decimal price, decimal rate)
        => price * (1 + rate);
}
```

## インスタンスが向く例

```csharp
// この例では「static とインスタンス」の要点を最小のコードで確認します。
public class OrderService
{
    private readonly IClock clock;

    public OrderService(IClock clock)
    {
        this.clock = clock;
    }
}
```

## 実務での使い方

副作用がなく、入力だけで結果が決まる小さな関数は `static` でも扱いやすいです。現在時刻、設定、DB、外部 API、ログに依存する処理は DI で渡せるインスタンスにします。

## 関連リンク

- [Static classes and static class members](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members)
