# Factory / Strategy / Adapter

## 目的

実務でよく出る3つのデザインパターンの使いどころを理解します。

## 要点

- Factory は生成処理を集約します。文字列や enum から適切な実装を選ぶ、生成時に必要な依存をまとめる、といった場面で使います。
- Strategy はアルゴリズムを差し替えます。支払い方法、割引計算、通知手段など、同じ入口で中身の処理だけ変えたい場合に有効です。
- Adapter は既存のインターフェイスを利用側に合わせます。外部 API client や legacy library の戻り値を、自分たちの domain model に変換するときに使います。
- パターンは目的ではなく手段です。`if` が1つだけの単純な処理に無理に適用すると、class 数だけが増えて読みにくくなります。

- 注意: 単純な if で十分な場所に過剰なパターンを入れる。
- 注意: パターンのためにクラス数だけ増える。
- 注意: 名前だけ Factory で責務が曖昧。

## Strategy と Factory の例

```csharp
public interface IDiscountStrategy
{
    decimal Apply(decimal amount);
}

public class RegularDiscountStrategy : IDiscountStrategy
{
    public decimal Apply(decimal amount) => amount;
}

public class PremiumDiscountStrategy : IDiscountStrategy
{
    public decimal Apply(decimal amount) => amount * 0.9m;
}

public class DiscountStrategyFactory
{
    public IDiscountStrategy Create(string customerRank)
    {
        return customerRank switch
        {
            "Premium" => new PremiumDiscountStrategy(),
            "Regular" => new RegularDiscountStrategy(),
            _ => throw new ArgumentException("未知の顧客ランクです。", nameof(customerRank))
        };
    }
}
```

## Adapter の例

```csharp
public record ExternalCustomerResponse(string CustomerCode, string DisplayName);
public record Customer(string Code, string Name);

public class CustomerAdapter
{
    public Customer Convert(ExternalCustomerResponse response)
    {
        // 外部 API の項目名を、自社 domain の名前に変換します。
        return new Customer(response.CustomerCode, response.DisplayName);
    }
}
```

Strategy の例では、割引計算の入口を `IDiscountStrategy` に揃えています。Factory は顧客ランクから使う strategy を選びます。Adapter の例では、外部 API の `CustomerCode` と `DisplayName` を、自社で使う `Customer` の `Code` と `Name` に変換しています。

## 実務での使い方

決済方法ごとの処理、通知手段の切り替え、外部 API クライアントの差し替えなどで使います。パターン名を当てはめるより、変更点を局所化できるかを見ます。

## 関連リンク

- [Design patterns for microservices](https://learn.microsoft.com/azure/architecture/microservices/design/patterns)
