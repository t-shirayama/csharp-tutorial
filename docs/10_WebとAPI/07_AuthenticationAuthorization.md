# Authentication / Authorization

## 目的

認証と認可の違いを理解し、API 保護の入口を押さえます。

## 要点

- Authentication は「誰か」を確認します。
- Authorization は「何をしてよいか」を判断します。
- JWT、Cookie、OAuth/OIDC など方式があります。
- SPA / mobile / 外部公開 API は JWT、ブラウザ中心の server-rendered app は Cookie、企業 ID 連携は OIDC / Entra ID などを検討します。

- 注意: 認証済みならすべて操作可能にする。
- 注意: JWT の検証設定を曖昧にする。
- 注意: 権限チェックを UI だけに置く。
- 注意: `UseAuthentication` と `UseAuthorization` の順番を逆にする。
- 注意: token の有効期限や失効を設計しない。

## コード例

```csharp
// この例では「Authentication / Authorization」の要点を最小のコードで確認します。
app.MapGet("/me", (ClaimsPrincipal user) => user.Identity?.Name)
    .RequireAuthorization();
```

## 方式の選び方

| 方式 | 向いている場面 | 注意点 |
| --- | --- | --- |
| Cookie | Razor Pages / MVC など、同一サイトのブラウザアプリ | CSRF 対策、SameSite、secure cookie が重要。 |
| JWT Bearer | SPA、mobile app、外部 client が呼ぶ API | 署名検証、有効期限、issuer / audience の検証が重要。 |
| OIDC / OAuth | 外部 ID 基盤や企業 ID と連携する場合 | token の用途と flow を理解する。 |

## JWT Bearer の最小構成

```csharp
// この例では JWT bearer token を検証する入口を設定します。
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://login.example.com";
        options.Audience = "memo-api";
    });

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
```

`UseAuthentication` は user を復元し、`UseAuthorization` は endpoint の policy を評価します。順番が逆だと、認可時に user 情報が正しく使えません。

## 実務での使い方

社内 API、管理画面、ユーザー向け API で必須です。認可はロールだけでなく、リソース所有者かどうかなど業務ルールと絡みます。

実務では、token を発行する側と検証する API 側の責務を分けます。API は署名、有効期限、issuer、audience を検証し、必要な claim だけを業務処理に渡します。refresh token は漏えい時の影響が大きいため、保存場所と失効方法を設計します。


## 関連リンク

- [Authentication in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/authentication/)
- [Authorization in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/authorization/)
- [JWT bearer authentication](https://learn.microsoft.com/aspnet/core/security/authentication/configure-jwt-bearer-authentication)
