# lock と同期プリミティブ

## 目的

共有状態を守る `lock`、`Monitor`、`SemaphoreSlim`、`Interlocked` の入口を理解します。

## 前提

- [スレッド安全性](10_スレッド安全性.md) を読んでいる

## 要点

- 共有 mutable state は race condition の原因になります。
- `lock` は同時に 1 つの処理だけを critical section に入れます。
- `Interlocked` は単純な数値更新を atomic に行えます。
- `SemaphoreSlim` は同時実行数を制限できます。
- 注意: `lock` 対象に public object や string を使う。
- 注意: lock 範囲を広げすぎて性能や deadlock の原因にする。
- 注意: `lock` 内で `await` しようとする。
- 注意: thread-safe ではない collection を複数 thread から更新する。

## コード例

```csharp
// この例では「lock と同期プリミティブ」の要点を最小のコードで確認します。
private static readonly object Gate = new();
private static int count;

static void Increment()
{
    lock (Gate)
    {
        count++;
    }
}
```

## Interlocked の例

```csharp
// この例では「lock と同期プリミティブ」の要点を最小のコードで確認します。
private static int count;

Interlocked.Increment(ref count);
```

`lock` の中は同時に 1 thread だけが実行します。`count++` は読み取り、加算、書き込みの複合操作なので、共有状態では保護が必要です。単純な増減なら `Interlocked` も使えます。

## 実務での使い方

まず共有状態をなくす設計を検討します。どうしても共有する場合に、`lock` や thread-safe collection を使います。非同期 method の中で `lock` と `await` を混ぜないように注意します。

## 関連リンク

- [lock statement](https://learn.microsoft.com/dotnet/csharp/language-reference/statements/lock)
- [Monitor Class](https://learn.microsoft.com/dotnet/api/system.threading.monitor)
- [Interlocked Class](https://learn.microsoft.com/dotnet/api/system.threading.interlocked)
- [SemaphoreSlim Class](https://learn.microsoft.com/dotnet/api/system.threading.semaphoreslim)
