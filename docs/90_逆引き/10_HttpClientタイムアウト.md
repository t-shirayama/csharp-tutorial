# HttpClient タイムアウト

## 症状

外部 API 呼び出しが遅い、タイムアウトする、または処理が待ち続けます。

## 主な原因

- `HttpClient.Timeout` が未設定または長すぎる。
- 外部 API が遅延または障害中。
- DNS、proxy、証明書、ネットワークの問題。
- retry 方針がなく一時障害に弱い。

## 確認コマンド

```powershell
Invoke-WebRequest https://api.example.com/health
dotnet run
```

## 解決手順

1. 外部 API が単体で応答するか確認する。
2. typed client の `BaseAddress` と `Timeout` を確認する。
3. cancellation token が渡されているか確認する。
4. retry すべき status と retry しない status を分ける。
5. ログに URL、status code、所要時間を残す。

## 関連リンク

- [HttpClient と HttpClientFactory](../04_標準ライブラリ/06_HttpClient.md)
- [タイムアウトとリトライ](../05_非同期と並行処理/09_タイムアウトとリトライ.md)
- [外部 API 連携](../10_WebとAPI/12_外部API連携.md)
