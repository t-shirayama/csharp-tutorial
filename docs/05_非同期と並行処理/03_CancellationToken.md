# CancellationToken

## 目的

時間のかかる処理を途中でキャンセルできるようにする `CancellationToken` を理解します。

## 要点

- `CancellationToken` はキャンセル要求を伝えるための値です。
- 受け取った token は、さらに下位の async API へ渡します。
- キャンセルは失敗ではなく、利用者が処理停止を要求した状態です。
- 注意: token を受け取るだけで下位処理に渡さない。
- 注意: キャンセル例外を通常エラーとしてログに大量出力する。
- 注意: キャンセルできない無限ループを書く。

## コード例

```csharp
// この例では「CancellationToken」の要点を最小のコードで確認します。
static async Task<string> DownloadAsync(string url, CancellationToken cancellationToken)
{
    using var httpClient = new HttpClient();
    return await httpClient.GetStringAsync(url, cancellationToken);
}
```

## 実務での使い方

Web API のリクエスト中断、画面操作のキャンセル、バッチ停止で重要です。ASP.NET Core では `HttpContext.RequestAborted` や action 引数の `CancellationToken` を下位処理へ渡します。

## 関連リンク

- [Cancellation in managed threads](https://learn.microsoft.com/dotnet/standard/threading/cancellation-in-managed-threads)
