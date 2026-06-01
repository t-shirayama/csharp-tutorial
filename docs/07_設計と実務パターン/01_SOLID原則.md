# SOLID 原則

## 目的

保守しやすいオブジェクト指向設計の基本観点として SOLID を理解します。

## 要点

- S: 単一責任。1つの class に複数の変更理由を詰め込まず、業務判断、永続化、通知、表示などの責務を分けます。
- O: 拡張に開き、修正に閉じる。新しい種類が増えるたびに既存コードの `if` や `switch` を直すのではなく、差し替えられる形を検討します。
- L: 派生型は基底型として扱える。interface や base class を使う側が、実装型によって予想外の制約を受けないようにします。
- I: 大きすぎる interface を分ける。使わない method まで実装させる interface は、利用者の目的ごとに分割します。
- D: 具象ではなく抽象に依存する。業務ロジックが `SmtpMailSender` や `SystemClock` のような具体実装へ直接依存すると、テストや差し替えが難しくなります。

- 注意: 原則を守るために抽象化しすぎる。
- 注意: 小さな処理にも過剰なクラス分割をする。
- 注意: 原則の名前だけで設計判断を説明する。

## 違反例と改善例

```csharp
public class OrderService
{
    public void Complete(int orderId)
    {
        // 業務処理、DB 保存、メール送信が1つの method に混ざっています。
        Console.WriteLine($"Order {orderId} completed.");

        var mailSender = new SmtpMailSender();
        mailSender.Send("order@example.com", "completed");
    }
}
```

```csharp
public class OrderService
{
    private readonly IMessageSender messageSender;

    public OrderService(IMessageSender messageSender)
    {
        this.messageSender = messageSender;
    }

    public void Complete(int orderId)
    {
        // OrderService は注文完了の use case に集中し、通知手段は外から受け取ります。
        messageSender.Send("order@example.com", "completed");
    }
}

public interface IMessageSender
{
    void Send(string to, string message);
}
```

違反例では `OrderService` が `SmtpMailSender` を直接作っています。これにより、テストでメール送信を fake に差し替えにくくなります。改善例では `IMessageSender` を constructor で受け取り、通知手段を外から差し替えられるようにしています。

## 実務での使い方

SOLID は暗記よりレビュー観点として使うのが実用的です。「このクラスの責務は多すぎないか」「差し替えたい依存を直接 new していないか」を確認します。

## 関連リンク

- [SOLID principles](https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/architectural-principles)
