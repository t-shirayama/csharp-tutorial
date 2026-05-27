# CORS エラー

## 症状

browser の開発者 tool に `blocked by CORS policy`、`No 'Access-Control-Allow-Origin' header` などが表示され、frontend から API を呼べません。

## 主な原因

- API 側で許可 origin を設定していない。
- `UseCors` の呼び出し位置が不適切。
- credentials を使うのに wildcard origin を指定している。
- browser ではなく server-to-server 通信にも CORS が関係すると誤解している。

## 確認コマンド

```powershell
dotnet run
Invoke-WebRequest http://localhost:5000/health
```

## 対処例

```csharp
// この例では frontend の origin だけを許可します。
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins("https://app.example.com")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("Frontend");
```

## コードの読み方

`WithOrigins` は browser からの許可元を限定します。`AllowAnyOrigin` と credentials の併用は危険なため避けます。CORS は browser の安全機構なので、API server 同士の通信失敗とは切り分けます。

## 解決手順

1. browser console の CORS error message を読む。
2. request の origin と API 側の許可 origin が一致しているか確認する。
3. middleware の順序で `UseCors` が endpoint 実行前にあるか確認する。
4. cookie / Authorization header を使う場合は credentials 方針を確認する。
5. production では `AllowAnyOrigin` を避け、明示的な origin にする。

## 関連リンク

- [CORS](../10_WebとAPI/13_CORS.md)
- [Middleware](../10_WebとAPI/09_Middleware.md)
- [Authentication / Authorization](../10_WebとAPI/07_AuthenticationAuthorization.md)
