# Task.WhenAll

## 目的

複数の非同期処理を並行して待つ `Task.WhenAll` を理解します。

## 要点

- 独立した複数の I/O 処理は `Task.WhenAll` で同時に進められます。
- 依存関係がある処理は順番に `await` します。
- 例外が起きた場合の扱いを決めておきます。
- 注意: 依存関係がある処理まで無理に並行化する。
- 注意: 大量の Task を一気に作って外部サービスやメモリを圧迫する。
- 注意: 例外時にどの処理が失敗したか分からない。

## コード例

```csharp
// この例では「Task.WhenAll」の要点を最小のコードで確認します。
var firstTask = LoadAsync("first");
var secondTask = LoadAsync("second");

var results = await Task.WhenAll(firstTask, secondTask);

foreach (var result in results)
{
    Console.WriteLine(result);
}

static async Task<string> LoadAsync(string name)
{
    await Task.Delay(1000);
    return name;
}
```

## 実務での使い方

複数 API の問い合わせ、複数ファイルの読み込みなどで使います。ただし外部サービスに負荷をかけすぎないよう、同時実行数の制限も検討します。

## 関連リンク

- [Task.WhenAll](https://learn.microsoft.com/dotnet/api/system.threading.tasks.task.whenall)
