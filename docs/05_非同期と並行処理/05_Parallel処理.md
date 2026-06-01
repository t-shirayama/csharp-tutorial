# Parallel 処理

## 目的

CPU 処理を並列実行する `Parallel` と、非同期 I/O との違いを理解します。

## 要点

- `Parallel` は CPU バウンドな処理の並列化に使います。
- I/O 待ちには async / await を優先します。
- 共有状態を変更すると競合に注意が必要です。
- 注意: I/O 処理に `Parallel.ForEach` を使う。
- 注意: 複数スレッドから同じ List に Add する。
- 注意: 並列化すれば必ず速くなると思い込む。

## コード例

```csharp
// この例では「Parallel 処理」の要点を最小のコードで確認します。
var numbers = Enumerable.Range(1, 10);

Parallel.ForEach(numbers, number =>
{
    Console.WriteLine($"{number}: {number * number}");
});
```

## 実務での使い方

画像処理、重い計算、変換処理など CPU を使う作業で検討します。Web API のリクエスト処理内で安易に使うと、サーバー全体のスレッドを圧迫することがあります。

## 関連リンク

- [Data parallelism](https://learn.microsoft.com/dotnet/standard/parallel-programming/data-parallelism-task-parallel-library)
