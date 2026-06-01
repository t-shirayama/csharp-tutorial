# async / await

## 目的

`async` と `await` を使って、非同期処理を読みやすく書く方法を理解します。

## 要点

- `async` を付けたメソッド内で `await` を使えます。
- `await` は Task の完了を待ち、結果を取り出します。
- メソッド名には慣習として `Async` を付けます。
- 注意: `async void` を通常メソッドで使う。
- 注意: `await` し忘れて例外や実行順を見失う。
- 注意: async メソッド内で重い CPU 処理をそのまま実行する。

## コード例

```csharp
// この例では「async / await」の要点を最小のコードで確認します。
static async Task<int> GetLengthAsync(string url)
{
    using var httpClient = new HttpClient();
    var text = await httpClient.GetStringAsync(url);
    return text.Length;
}
```

## 実務での使い方

ASP.NET Core、EF Core、HttpClient では async API が標準です。呼び出し元まで async を伝播させ、途中で同期ブロックしないようにします。

## 関連リンク

- [async and await](https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/)
