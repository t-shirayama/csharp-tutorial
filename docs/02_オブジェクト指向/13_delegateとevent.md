# delegate と event

## 目的

メソッドを値として扱う `delegate` と、出来事を通知する `event` の基本を理解します。

## 前提

- [interface](05_interface.md) を読んでいる
- [async / await](../05_非同期と並行処理/02_async-await.md) を読んでいる

## 要点

- `delegate` はメソッドを代入できる型です。
- `event` は外部から購読できる通知口です。
- 実務では `Action<T>`、`Func<T>`、イベント、LINQ、非同期 callback の理解に関係します。
- 注意: event を解除せず、長寿命 object から参照され続ける。
- 注意: event handler の中で例外が出たときの影響範囲を考えない。
- 注意: delegate、event、interface の使い分けをせず、通知と依存差し替えを混同する。

## コード例

```csharp
// この例では「delegate と event」の要点を最小のコードで確認します。
public class OrderNotifier
{
    public event EventHandler<OrderSubmittedEventArgs>? OrderSubmitted;

    public void Submit(string orderId)
    {
        // 注文確定後、購読者がいれば通知します。
        OrderSubmitted?.Invoke(this, new OrderSubmittedEventArgs(orderId));
    }
}

public sealed class OrderSubmittedEventArgs : EventArgs
{
    public OrderSubmittedEventArgs(string orderId)
    {
        OrderId = orderId;
    }

    public string OrderId { get; }
}

var notifier = new OrderNotifier();
notifier.OrderSubmitted += (_, args) => Console.WriteLine(args.OrderId);
notifier.Submit("ORD-001");
```

`OrderSubmitted` は注文確定という出来事を外部へ知らせる event です。購読側は `+=` で処理を登録します。`?.Invoke` は購読者がいる場合だけ通知します。

## 実務での使い方

GUI、ドメインイベント、進捗通知、ライブラリの callback で使います。単純に処理を差し替えたいだけなら interface や `Func<T>` の方が読みやすいこともあります。複数の購読者へ通知したい場合は event が自然です。

## 関連リンク

- [Delegates](https://learn.microsoft.com/dotnet/csharp/programming-guide/delegates/)
- [Events](https://learn.microsoft.com/dotnet/csharp/programming-guide/events/)
- [Standard .NET event patterns](https://learn.microsoft.com/dotnet/csharp/event-pattern)
