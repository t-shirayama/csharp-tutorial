# CORS

## 目的

Cross-Origin Resource Sharing の役割と、ASP.NET Core での設定方法を理解します。

## 前提

- [ASP.NET Core の構造](01_ASPNETCoreの構造.md) を読んでいる
- [Request / Response](05_RequestResponse.md) を読んでいる

## 要点

- CORS は browser が異なる origin への request を制御する仕組みです。
- server は許可する origin、method、header を明示します。
- cookie や認証情報を送る場合は `AllowCredentials` の扱いに注意します。
- CORS は認証や認可の代わりではありません。
- 注意: CORS error と API の認証エラーを混同しないようにします。
- 注意: `AllowAnyOrigin` と credentials は同時に使えません。本番で localhost や wildcard を許可したままにしないよう確認します。
- 注意: CORS を設定しても API 自体が安全になるわけではないため、認証認可は別に実装します。

## コード例

```csharp
// この例では SPA の origin だけを API から許可します。
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

`WithOrigins` で許可する frontend の origin を限定しています。`UseCors` は routing と endpoint の構成に合わせて置く必要があります。全 origin を安易に許可すると、意図しない browser client から API が呼ばれやすくなります。

## 実務での使い方

SPA と API の domain が違う場合、開発環境と本番環境で許可 origin を分けます。環境変数や設定ファイルから許可 origin を読み、review で wildcard のまま本番へ出ていないか確認します。

## 関連リンク

- [Enable Cross-Origin Requests](https://learn.microsoft.com/aspnet/core/security/cors)
