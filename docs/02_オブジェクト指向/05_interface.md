# interface

## 目的

`interface` を使って、実装ではなく「できること」に依存する考え方を理解します。

## 要点

- interface は、クラスが提供する機能の契約を表します。
- 呼び出し側は具体クラスではなく interface に依存できます。
- テスト、差し替え、DI と相性がよいです。
- 注意: 1つの実装しかなく差し替え予定もないのに、機械的に interface を作る。
- 注意: interface が大きすぎて、実装クラスに不要なメソッドを強制する。
- 注意: 名前が `IManager` や `IService` だけで、何をする契約か分からない。

## コード例

```csharp
// この例では「interface」の要点を最小のコードで確認します。
IMessageSender sender = new ConsoleMessageSender();
sender.Send("Hello");

public interface IMessageSender
{
    void Send(string message);
}

public class ConsoleMessageSender : IMessageSender
{
    public void Send(string message)
    {
        Console.WriteLine(message);
    }
}
```

## 実務での使い方

メール送信、時刻取得、外部 API 呼び出し、ファイル操作など、テスト時に差し替えたい処理でよく使います。interface は「何でも抽象化する道具」ではなく、具体実装を差し替える理由があるときに効果が出ます。

## 関連リンク

- [Interfaces](https://learn.microsoft.com/dotnet/csharp/fundamentals/types/interfaces)
