# TimeProvider

## 目的

現在時刻に依存する処理をテストしやすくするため、`TimeProvider` の使い方を理解します。

## 前提

- [DateTime と DateTimeOffset](02_DateTimeとDateTimeOffset.md) を読んでいる
- [テストしやすい設計](../08_テストと品質/04_テストしやすい設計.md) を読んでいる

## 要点

- `DateTimeOffset.UtcNow` を直接呼ぶとテスト時に時刻を固定しにくいです。
- `TimeProvider` を DI で渡すと、時刻取得を差し替えられます。
- .NET 8 以降では `TimeProvider.System` が利用できます。
- 注意: `DateTime.Now` と UTC を混在させる。
- 注意: テストで現在時刻に依存し、日付が変わると落ちる。
- 注意: 時刻取得を service の奥深くに散らばらせる。

## コード例

```csharp
// この例では「TimeProvider」の要点を最小のコードで確認します。
public class CouponService
{
    // 現在時刻を直接取得せず、外から渡された TimeProvider 経由で扱います。
    private readonly TimeProvider timeProvider;

    public CouponService(TimeProvider timeProvider)
    {
        this.timeProvider = timeProvider;
    }

    // expiresAt と現在 UTC 時刻を比較し、有効期限切れかどうかを返します。
    public bool IsExpired(DateTimeOffset expiresAt)
        => timeProvider.GetUtcNow() >= expiresAt;
}
```

`CouponService` は現在時刻を `DateTimeOffset.UtcNow` から直接取得していません。`TimeProvider` を constructor で受け取ることで、通常実行時は `TimeProvider.System`、テスト時は固定時刻を返す provider に差し替えられます。

## DI 登録例

```csharp
// アプリ全体で標準の時刻 provider を共有します。
builder.Services.AddSingleton(TimeProvider.System);
```

## 実務での使い方

期限切れ、予約、課金締め、リトライ待ち、キャッシュ期限などで使います。時刻を直接呼ぶ範囲を狭めると、テストと障害調査が楽になります。

## 関連リンク

- [TimeProvider Class](https://learn.microsoft.com/dotnet/api/system.timeprovider)
