# Moq と NSubstitute

## 目的

モックライブラリを使って外部依存を差し替える基本と、使いすぎを避ける判断を理解します。

## 前提

- [モックとスタブ](03_モックとスタブ.md) を読んでいる
- [DI コンテナの実装](../07_設計と実務パターン/09_DIコンテナの実装.md) を読んでいる

## 要点

- Moq と NSubstitute はどちらも外部依存の代用品を作るためのライブラリです。
- 返り値を固定したいだけなら、手書きの stub で十分なことがあります。
- 呼び出し検証を増やしすぎると、テストが実装詳細に強く依存します。

## Moq の例

```csharp
// IClock の代用品を Moq で作ります。
var clock = new Mock<IClock>();

// Now が呼ばれたら、常に固定時刻を返すように設定します。
clock.Setup(x => x.Now).Returns(DateTimeOffset.Parse("2026-05-22T00:00:00Z"));

// テスト対象には mock.Object を渡します。
var service = new TodoService(clock.Object);

var todo = service.Create("Learn C#");

// 作成日時が固定時刻になっていることを検証します。
Assert.Equal(DateTimeOffset.Parse("2026-05-22T00:00:00Z"), todo.CreatedAt);
```

## Moq のコードの読み方

`Mock<IClock>` は `IClock` の代用品です。`Setup` で `Now` の戻り値を固定しているため、テストは実行時刻に左右されません。最後の `Assert.Equal` では、業務結果である `CreatedAt` を検証しています。

## NSubstitute の例

```csharp
// NSubstitute で IClock の代用品を作ります。
var clock = Substitute.For<IClock>();

// Now property の戻り値を固定します。
clock.Now.Returns(DateTimeOffset.Parse("2026-05-22T00:00:00Z"));

var service = new TodoService(clock);

var todo = service.Create("Learn C#");

Assert.Equal(DateTimeOffset.Parse("2026-05-22T00:00:00Z"), todo.CreatedAt);
```

## NSubstitute のコードの読み方

NSubstitute では `Substitute.For<IClock>()` で代用品を作り、property に対して `Returns` を指定します。Moq と構文は違いますが、目的は「外部依存を固定して、テスト対象の結果だけを見る」ことです。

## 手書き stub の例

```csharp
// この例では「Moq と NSubstitute」の要点を最小のコードで確認します。
public class FixedClock : IClock
{
    // テストごとに必要な固定時刻を object initializer で指定できます。
    public DateTimeOffset Now { get; init; } = DateTimeOffset.Parse("2026-05-22T00:00:00Z");
}
```

値を返すだけなら、このような手書き stub の方が読みやすい場合があります。


## 実務での使い方

メール送信、外部 API、現在時刻、ID 発行、ファイル保存などを差し替えます。DB を含むテストでは、モックより Testcontainers や SQLite などの統合テストを選ぶ方が実態に近いことがあります。

## レビュー観点

- モック対象は外部依存か。
- テストは結果を検証しているか、実装手順を検証しすぎていないか。
- 手書き stub で十分ではないか。
- 依存が多すぎる場合、service を分割すべきではないか。

- 注意: モックで内部実装の呼び出し順を細かく検証する。
- 注意: private メソッドをテストしたくて設計を歪める。
- 注意: モックが多すぎるのに、クラスの責務を見直さない。
- 注意: ライブラリの構文にテスト意図が埋もれる。

## 関連リンク

- [Unit testing best practices](https://learn.microsoft.com/dotnet/core/testing/unit-testing-best-practices)
- [Moq](https://github.com/devlooped/moq)
- [NSubstitute](https://nsubstitute.github.io/)
