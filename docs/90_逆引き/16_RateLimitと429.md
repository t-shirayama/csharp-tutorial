# Rate limit と 429

## 症状

API が `429 Too Many Requests` を返す、または短時間の連続 request で一部の処理が拒否されます。

## 主な原因

- API 側で rate limiting policy に達している。
- client 側に retry / backoff がない。
- user 単位、IP 単位、token 単位の制限範囲を誤解している。
- cache できる request を毎回 API へ送っている。

## 確認コマンド

```powershell
dotnet run
Invoke-WebRequest http://localhost:5000/api/items
```

## 対処例

```csharp
// この例では固定 window で request 数を制限します。
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("Api", limiterOptions =>
    {
        limiterOptions.PermitLimit = 100;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
    });
});
```

## コードの読み方

`PermitLimit` は window 内で許可する request 数です。`Window` は集計する時間幅です。制限を超えた request は拒否されるため、client 側では retry 間隔や user への表示も考えます。

## 解決手順

1. 429 が API 側の rate limit か、外部 API の制限かを切り分ける。
2. 制限単位が user / IP / token のどれか確認する。
3. client 側で指数 backoff や待機時間を設計する。
4. GET で再利用できる response は cache header を検討する。
5. log に制限 policy、status code、request path を残す。

## 関連リンク

- [Rate Limiting と Caching](../10_WebとAPI/14_RateLimitingとCaching.md)
- [タイムアウトとリトライ](../05_非同期と並行処理/09_タイムアウトとリトライ.md)
- [TimeSpan](../04_標準ライブラリ/16_TimeSpan.md)
