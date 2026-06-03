# 非同期と並行処理

async / await、Task、CancellationToken などを扱うカテゴリです。

## 記事

- [Task の基本](01_Taskの基本.md)
- [async / await](02_async-await.md)
- [CancellationToken](03_CancellationToken.md)
- [Task.WhenAll](04_TaskWhenAll.md)
- [Parallel 処理](05_Parallel処理.md)
- [Channel の入口](06_Channelの入口.md)
- [非同期処理のよくある落とし穴](07_非同期処理のよくある落とし穴.md)
- [非同期ストリーム](08_非同期ストリーム.md)
- [タイムアウトとリトライ](09_タイムアウトとリトライ.md)
- [スレッド安全性](10_スレッド安全性.md)
- [Thread と ThreadPool](11_ThreadとThreadPool.md)
- [lock と同期プリミティブ](12_lockと同期プリミティブ.md)
- [SynchronizationContext](13_SynchronizationContext.md)
- [TPL Dataflow の入口](14_TPLDataflowの入口.md)
- [Rx の入口](15_Rxの入口.md)
- [ValueTask](16_ValueTask.md)
- [IProgress](17_IProgress.md)

## 到達目標

- I/O 待ちと CPU 処理の違いを説明できる。
- キャンセル可能な非同期処理を書ける。
- `async void` を避ける理由を説明できる。
- 非同期ストリーム、タイムアウト、共有状態の危険を説明できる。
- Thread、ThreadPool、lock、SynchronizationContext、TPL Dataflow、Rx の入口を説明できる。
- `ValueTask` と `IProgress<T>` の使いどころを説明できる。

## 次に進むカテゴリ

- [型システムと言語機能](../06_型システムと言語機能/README.md)
- [WebとAPI](../10_WebとAPI/README.md)
