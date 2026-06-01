# flaky test 対策

## 目的

環境やタイミングによって成功したり失敗したりする flaky test の原因を理解し、安定したテストに直せるようにします。

## 前提

- [テスト戦略](13_テスト戦略.md) を読んでいる
- [非同期処理のテスト](15_非同期処理のテスト.md) を読んでいる
- [テストデータ管理](16_テストデータ管理.md) を読んでいる

## 要点

- flaky test は、同じ code でも成功したり失敗したりするテストです。信頼されなくなると CI の価値を下げます。
- よくある原因は、現在時刻、乱数、並列実行、共有 DB、外部 API、sleep、実行順序依存、file path の衝突です。
- flaky test を rerun だけでごまかすと、実際の不具合を見逃します。まず原因を分類し、制御可能な依存に置き換えます。
- 現在時刻は `TimeProvider` や `IClock` で固定します。乱数は seed を固定するか、乱数生成を依存として差し替えます。
- 外部 API は unit test では fake / stub にし、実物確認は integration test として実行条件を分けます。
- 並列実行で衝突するテストは、データを一意にする、transaction を分ける、collection fixture を使うなど、衝突をなくす設計を優先します。

- 注意: CI で落ちたテストを rerun して通れば問題なしにする。
- 注意: `Thread.Sleep` や `Task.Delay` を増やして失敗率だけ下げる。
- 注意: test data を固定 ID で共有し、並列実行で衝突する。
- 注意: 外部 API の一時障害で unit test が落ちる。
- 注意: skip したテストを放置する。

## flaky になりやすい悪い例

```csharp
[Fact]
public async Task ProcessAsync_CompletesAfterDelay()
{
    var service = new JobService();

    var task = service.ProcessAsync();

    // 処理が終わるはず、という推測で待っているため環境によって失敗します。
    await Task.Delay(100);

    Assert.True(service.IsCompleted);
}
```

## 終了条件を待つ例

```csharp
[Fact]
public async Task ProcessAsync_Completes()
{
    var service = new JobService();

    await service.ProcessAsync();

    Assert.True(service.IsCompleted);
}
```

処理が `Task` を返せるなら、固定時間待つのではなく `await` で完了を待ちます。

## 時刻を固定する例

```csharp
public sealed class FixedClock : IClock
{
    public DateTimeOffset Now { get; init; } = DateTimeOffset.Parse("2026-05-22T00:00:00Z");
}

[Fact]
public void IsExpired_ReturnsTrue_WhenNowIsAfterExpiresAt()
{
    var clock = new FixedClock
    {
        Now = DateTimeOffset.Parse("2026-05-22T10:00:00Z")
    };
    var token = new AccessToken(expiresAt: DateTimeOffset.Parse("2026-05-22T09:59:59Z"));

    var result = token.IsExpired(clock.Now);

    Assert.True(result);
}
```

## 原因別の対策

| 原因 | 対策 |
| --- | --- |
| 現在時刻 | `TimeProvider`、`IClock`、固定時刻を使う |
| 乱数 | seed 固定、random provider を差し替える |
| 外部 API | fake / stub、typed client の境界で差し替える |
| sleep | 完了 `Task`、明確な終了条件、短い timeout を使う |
| 共有 DB | test ごとにデータを分ける、transaction、container 初期化 |
| 並列実行 | shared state を消す、必要なら collection を分ける |
| 実行順序依存 | 各テストを独立させる |

悪い例では、`Task.Delay(100)` が「100ms 待てば終わるはず」という環境依存の仮定になっています。CPU 負荷や CI の遅さで処理が終わらない可能性があります。改善例では、`ProcessAsync` の完了を `await` しているため、テストは実際の終了条件に基づいて進みます。

## 実務での使い方

CI でたまに失敗するテストは、優先度を下げずに調査します。失敗ログ、実行時刻、runner、並列数、直前の変更、外部サービス状態を記録します。やむを得ず一時的に skip する場合は、理由、期限、再有効化の issue を残します。

## 関連リンク

- [非同期処理のテスト](15_非同期処理のテスト.md)
- [テストデータ管理](16_テストデータ管理.md)
- [Unit testing best practices](https://learn.microsoft.com/dotnet/core/testing/unit-testing-best-practices)
