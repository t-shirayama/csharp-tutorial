# Thread と ThreadPool

## 目的

`Thread` と `ThreadPool` の役割を理解し、通常の実務で `Task` を優先する理由を説明できるようにします。

## 前提

- [Task の基本](01_Taskの基本.md) を読んでいる
- [Parallel 処理](05_Parallel処理.md) を読んでいる

## 要点

- `Thread` は OS thread を直接扱う低レベル API です。
- `ThreadPool` は再利用される worker thread のプールです。
- `Task`、`async/await`、`Parallel` は ThreadPool を内部で使うことがあります。
- 注意: I/O 待ちのために thread を増やす。
- 注意: thread を作りすぎて context switch を増やす。
- 注意: ASP.NET Core request 内で長時間 thread を占有する。

## コード例

```csharp
// この例では「Thread と ThreadPool」の要点を最小のコードで確認します。
var thread = new Thread(() =>
{
    Console.WriteLine($"Thread ID: {Environment.CurrentManagedThreadId}");
});

thread.Start();
thread.Join();
```

`Thread` を直接作ると、開始や終了待ちを自分で管理します。短い並行処理や非同期 I/O では、通常 `Task` や `async/await` の方が扱いやすくなります。

## 実務での使い方

通常の Web API や CLI では `Thread` を直接作らず、`Task`、`BackgroundService`、`Channel`、`Parallel` を使います。長寿命の専用 thread が必要な特殊処理では検討します。

## 関連リンク

- [Thread Class](https://learn.microsoft.com/dotnet/api/system.threading.thread)
- [The managed thread pool](https://learn.microsoft.com/dotnet/standard/threading/the-managed-thread-pool)
