# TimeSpan

## 目的

期間や経過時間を表す `TimeSpan` の基本を理解します。

## 前提

- [DateTime と DateTimeOffset](02_DateTimeとDateTimeOffset.md) を読んでいる
- [TimeProvider](08_TimeProvider.md) を読んでいる

## 要点

- `TimeSpan` は時刻ではなく期間を表します。
- 注意: local time で期限計算し、time
- timeout、retry interval、経過時間、期限計算でよく使います。
- 日付や time zone を含む意味は `DateTimeOffset` と分けて考えます。
- 注意: `TimeSpan.Seconds` と `TimeSpan.TotalSeconds` を混同する。
- 注意: local time で期限計算し、time zone や daylight saving に影響される。
- 注意: 設定値の単位が曖昧なまま使う。

## コード例

```csharp
// この例では処理時間と timeout の長さを TimeSpan で表します。
var timeout = TimeSpan.FromSeconds(3);
var startedAt = DateTimeOffset.UtcNow;

await Task.Delay(TimeSpan.FromMilliseconds(500));

var elapsed = DateTimeOffset.UtcNow - startedAt;
Console.WriteLine(elapsed < timeout);
```

`TimeSpan.FromSeconds` は「3 秒間」という期間を作ります。`DateTimeOffset` 同士を引くと経過時間として `TimeSpan` が得られます。時刻そのものと、時刻同士の差分を分けて読むのが大事です。

## 実務での使い方

HTTP timeout、cache lifetime、retry interval、session 有効期間、batch の所要時間計測で使います。設定値から読む場合は単位を明確にし、秒なのかミリ秒なのかを名前に含めます。

 zone や daylight saving に影響される。

## 関連リンク

- [TimeSpan Struct](https://learn.microsoft.com/dotnet/api/system.timespan)
