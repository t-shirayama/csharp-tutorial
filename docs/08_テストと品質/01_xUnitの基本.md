# xUnit の基本

## 目的

.NET でよく使われる xUnit を使い、最小のユニットテストを書けるようにします。

## 要点

- `[Fact]` は引数なしのテストです。1つの条件と1つの期待結果を確認する基本形として使い、テストの意図がぶれないようにします。
- `[Theory]` と `[InlineData]` は複数パターンのテストに使います。同じ仕様を入力値だけ変えて確認したい場合に有効で、重複したテストコードを減らせます。
- テスト名は仕様として読める名前にします。`Test1` ではなく、`Add_ReturnsSum` や `CreateOrder_Throws_WhenQuantityIsZero` のように、対象、条件、期待結果が分かる名前にします。
- テストは Arrange、Act、Assert の流れで読むと整理しやすくなります。準備、実行、検証が混ざると、失敗したときに原因を追いにくくなります。
- 良い unit test は速く、安定していて、失敗理由が明確です。現在時刻、乱数、外部 API、実 DB に直接依存すると不安定になりやすいため、DI や fake を使って制御します。
- 1つのテストで多くの仕様を確認しすぎると、失敗時に何が壊れたのか分かりにくくなります。関連する assert はまとめてもよいですが、別の仕様は別テストへ分けます。

## コード例

```csharp
// この例では「xUnit の基本」の要点を最小のコードで確認します。
public class CalculatorTests
{
    [Fact]
    public void Add_ReturnsSum()
    {
        var calculator = new Calculator();

        var result = calculator.Add(1, 2);

        Assert.Equal(3, result);
    }
}
```

## 確認コマンド

```powershell
dotnet test
```

`CalculatorTests` は `Calculator` の仕様を確認する test class です。`[Fact]` が付いた `Add_ReturnsSum` は、引数なしで1つの仕様を検証するテストです。`var result = calculator.Add(1, 2);` が実行対象、`Assert.Equal(3, result);` が期待結果の確認です。失敗したときに「足し算が期待値を返さない」と分かる名前にしています。

複数の入力値を同じ仕様で確認する場合は [境界値と例外のテスト](14_境界値と例外のテスト.md)、非同期 method を確認する場合は [非同期処理のテスト](15_非同期処理のテスト.md) へ進みます。

## 関連リンク

- [Unit testing C# with xUnit](https://learn.microsoft.com/dotnet/core/testing/unit-testing-csharp-with-xunit)
