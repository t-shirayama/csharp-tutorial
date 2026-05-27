# async / await 誤用

## 症状

非同期処理で結果が返らない、例外が捕捉できない、処理順が想定と違う、または `async void` が原因でテストしにくくなります。

## 主な原因

- `Task` を返す method を `await` していない。
- event handler 以外で `async void` を使っている。
- 非同期処理の例外を呼び出し元へ返せていない。
- I/O 待ちと CPU bound 処理を混同している。

## 確認コマンド

```powershell
dotnet build
dotnet test
```

## 対処例

```csharp
// この例では非同期処理を await し、例外を呼び出し元で扱えるようにします。
try
{
    await SendEmailAsync(message, cancellationToken);
}
catch (HttpRequestException exception)
{
    Console.WriteLine(exception.Message);
}
```

## コードの読み方

`await` は `SendEmailAsync` の完了を待ち、失敗した場合は例外を現在の method へ戻します。`async void` にすると呼び出し元が完了や失敗を追いにくくなるため、通常は `Task` を返します。

## 解決手順

1. `Async` で終わる method の戻り値が `Task` / `Task<T>` / `ValueTask` か確認する。
2. 呼び出し側で `await` しているか確認する。
3. `async void` が event handler 以外にないか検索する。
4. cancellation token が必要な I/O に渡されているか確認する。
5. test で例外と cancellation の動きを確認する。

## 関連リンク

- [async / await](../05_非同期と並行処理/02_async-await.md)
- [CancellationToken](../05_非同期と並行処理/03_CancellationToken.md)
- [非同期処理のよくある落とし穴](../05_非同期と並行処理/07_非同期処理のよくある落とし穴.md)
