# IProgress

## 目的

長い処理の進捗を通知する `IProgress<T>` の使い方を理解します。

## 前提

- [async / await](02_async-await.md) を読んでいる
- [CancellationToken](03_CancellationToken.md) を読んでいる

## 要点

- `IProgress<T>` は処理側から呼び出し側へ進捗を通知するための interface です。
- CLI、desktop app、batch、upload / download で使います。
- cancellation は中止、progress は通知であり、役割が違います。
- 注意: progress 通知と cancellation を同じものとして扱う。
- 注意: 処理本体から直接 UI component を更新する。
- 注意: 通知頻度が高すぎて UI や log を詰まらせる。

## コード例

```csharp
// この例では長い処理の進捗率を呼び出し側へ通知します。
static async Task ImportAsync(IProgress<int> progress, CancellationToken cancellationToken)
{
    for (var percent = 0; percent <= 100; percent += 10)
    {
        cancellationToken.ThrowIfCancellationRequested();

        await Task.Delay(100, cancellationToken);
        progress.Report(percent);
    }
}
```

処理本体は `progress.Report` で進捗を通知し、`CancellationToken` で中止要求を確認します。進捗表示の方法は呼び出し側に任せるため、処理本体が UI や console に依存しにくくなります。

## 実務での使い方

大量 import、file upload、batch、desktop app の進捗 bar で使います。ASP.NET Core の通常 request では、進捗を即時に返すより background job と状態確認 API に分けることが多いです。

## 関連リンク

- [IProgress&lt;T&gt; Interface](https://learn.microsoft.com/dotnet/api/system.iprogress-1)
