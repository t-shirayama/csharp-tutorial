# Arrange / Act / Assert

## 目的

テストを読みやすくする基本構成 Arrange / Act / Assert を理解します。

## 要点

- Arrange は準備です。
- Act は実行です。
- Assert は検証です。

- 注意: Act が複数あり、何を検証しているか分からない。
- 注意: Assert が多すぎて失敗原因がぼやける。
- 注意: テスト同士が共有状態に依存する。

## コード例

```csharp
// この例では「Arrange / Act / Assert」の要点を最小のコードで確認します。
[Fact]
public void CalculateTotal_ReturnsUnitPriceTimesQuantity()
{
    var product = new Product("Pen", 100m);

    var total = product.CalculateTotal(3);

    Assert.Equal(300m, total);
}
```

`var product = new Product("Pen", 100m);` が Arrange で、テスト対象に必要な状態を準備しています。`var total = product.CalculateTotal(3);` が Act で、仕様として確認したい処理を1回だけ実行しています。`Assert.Equal(300m, total);` が Assert で、期待する結果を明示しています。

Arrange が長くなりすぎる場合は [テストデータ管理](16_テストデータ管理.md)、境界値や例外を増やす場合は [境界値と例外のテスト](14_境界値と例外のテスト.md) を参照します。

## 実務での使い方

テストが失敗したときに、準備・実行・検証のどこがおかしいか追いやすくなります。複雑な Arrange は設計が複雑すぎるサインでもあります。

## 関連リンク

- [Unit test basics](https://learn.microsoft.com/dotnet/core/testing/unit-testing-best-practices)
