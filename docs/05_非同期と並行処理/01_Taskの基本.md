# Task の基本

## 目的

非同期処理の結果を表す `Task` と `Task<T>` の役割を理解します。

## 要点

- `Task` は将来完了する処理を表します。処理そのものの結果値は返さず、「終わったか」「失敗したか」「キャンセルされたか」を呼び出し元へ伝えるために使います。
- `Task<T>` は将来 `T` の結果を返す処理を表します。たとえば `Task<string>` は、今すぐ文字列があるのではなく、非同期処理が完了した後に `string` を受け取れることを示します。
- I/O 待ちを含む処理でよく使います。HTTP 通信、DB アクセス、ファイル読み書きの待ち時間中にスレッドを占有しないための仕組みであり、CPU 計算を自動的に速くする機能ではありません。
- `async` メソッドの中では、完了を待つ箇所に `await` を付けます。`await` すると結果を取り出せるだけでなく、例外やキャンセルも通常の制御フローとして扱いやすくなります。
- `Task.Result` や `.Wait()` で同期的に待つと、UI アプリや ASP.NET でデッドロックやスレッド枯渇の原因になります。呼び出し元まで `async` / `await` を伝播させるのが基本です。
- `Task` を返すメソッド名には `Async` suffix を付けると、呼び出し側が非同期処理であることに気づきやすくなります。
- 注意: `Task.Result` や `.Wait()` で同期的に待つ。
- 注意: 非同期処理を呼び出しただけで `await` しない。
- 注意: CPU 処理を async にすれば速くなると思い込む。

## コード例

```csharp
// この例では「Task の基本」の要点を最小のコードで確認します。
static async Task<string> LoadMessageAsync()
{
    await Task.Delay(1000);
    return "done";
}

var message = await LoadMessageAsync();
Console.WriteLine(message);
```

## 実務での使い方

HTTP 通信、DB アクセス、ファイル I/O など待ち時間のある処理で使います。CPU を速くする機能ではなく、待ち時間中にスレッドを占有しないための仕組みです。

## 関連リンク

- [Task asynchronous programming model](https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/task-asynchronous-programming-model)
