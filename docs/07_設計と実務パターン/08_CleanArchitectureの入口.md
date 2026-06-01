# Clean Architecture の入口

## 目的

Clean Architecture の狙いと、実務で導入するときの判断材料を理解します。

## 要点

- 中心に業務ルールを置き、外側に UI、DB、外部サービスを置きます。Domain や UseCase が中心で、ASP.NET Core、EF Core、外部 API client は外側の詳細です。
- 内側は外側の詳細に依存しないようにします。UseCase は repository interface や clock interface に依存し、EF Core 実装や system clock は外側で差し替えます。
- UseCase は利用者の目的を表す単位です。`CreateOrder`、`CompleteOrder`、`CancelSubscription` のように、画面や DB ではなく業務操作で名前を付けます。
- 小規模アプリに機械的に導入すると過剰になることがあります。フォルダ名だけを Clean Architecture にするより、依存方向とテスト容易性を守れているかを見ます。

- 注意: フォルダ名だけ Clean Architecture にして依存方向が守られていない。
- 注意: UseCase が薄く、ただの中継コードになる。
- 注意: 小さな CRUD に過剰な層を作る。

## UseCase と port の例

```csharp
public class CompleteOrderUseCase
{
 private readonly IOrderRepository orderRepository;

 public CompleteOrderUseCase(IOrderRepository orderRepository)
 {
  this.orderRepository = orderRepository;
 }

 public async Task ExecuteAsync(int orderId, CancellationToken cancellationToken)
 {
  var order = await orderRepository.FindByIdAsync(orderId, cancellationToken)
   ?? throw new InvalidOperationException("注文が見つかりません。");

  order.Complete();
  await orderRepository.SaveAsync(order, cancellationToken);
 }
}

// UseCase から見た永続化の入口です。実装は Infrastructure 側に置きます。
public interface IOrderRepository
{
 Task<Order?> FindByIdAsync(int orderId, CancellationToken cancellationToken);
 Task SaveAsync(Order order, CancellationToken cancellationToken);
}
```

`CompleteOrderUseCase` は `IOrderRepository` を使いますが、EF Core や SQL の詳細は知りません。Clean Architecture では、この interface を内側に置き、実装を外側の Infrastructure に置くことで、内側が外側の技術詳細に依存しない形にします。

## 実務での使い方

長く保守する業務システム、複数 UI、DB や外部サービスの変更可能性が高い場合に効果が出やすいです。まずは依存方向とテスト容易性を理解することが大切です。

## 関連リンク

- [Common web application architectures](https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures)
