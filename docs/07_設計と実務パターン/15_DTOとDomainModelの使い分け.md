# DTO と Domain Model の使い分け

## 目的

Request / Response DTO、Entity、Domain Model、ViewModel の役割を分け、データの形をどこで変換するか判断できるようにします。

## 前提

- [アプリケーションサービスと責務分割](14_アプリケーションサービスと責務分割.md) を読んでいる
- [レイヤードアーキテクチャ](07_レイヤードアーキテクチャ.md) を読んでいる
- [record](../02_オブジェクト指向/04_record.md) を読んでいる

## 要点

- DTO は層やプロセスの境界でデータを運ぶための型です。API request、API response、外部 API response、message queue の payload など、外とやり取りする形を表します。
- Domain Model は業務ルールを表す型です。値を持つだけでなく、状態変更の条件や不正な値を防ぐ処理を持たせます。
- Entity は文脈によって意味が変わります。EF Core の Entity は DB 永続化の型、DDD の Entity は identity を持つ domain object です。記事やコードでどちらの意味かを明確にします。
- Request DTO をそのまま Domain Model や DB Entity にしない方が安全です。外部入力の都合、DB の都合、業務ルールの都合は変わる理由が違うためです。
- Response DTO は外部へ公開する契約です。Domain Model や DB Entity をそのまま返すと、内部構造や不要な情報まで API 契約に漏れることがあります。
- 変換処理は境界に置きます。Controller / endpoint、Application Service、assembler / mapper など、どこで変換するかを決めて散らばらないようにします。

- 注意: Request DTO をそのまま DB Entity として保存する。
- 注意: DB Entity をそのまま API response にする。
- 注意: Domain Model が getter / setter だけになり、業務ルールが service に散らばる。
- 注意: 変換処理が Controller、Service、Repository に分散する。
- 注意: DTO に validation や表示都合を詰め込みすぎ、用途が曖昧になる。

## 悪い例

```csharp
public class Order
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = "";
    public string InternalMemo { get; set; } = "";
    public decimal TotalAmount { get; set; }
}

app.MapGet("/orders/{id:int}", async (int id, AppDbContext dbContext) =>
{
    var order = await dbContext.Orders.FindAsync(id);

    // DB Entity をそのまま返すと、InternalMemo など内部情報が漏れる可能性があります。
    return order is null ? Results.NotFound() : Results.Ok(order);
});
```

## 改善例

```csharp
public record OrderResponse(int Id, string CustomerName, decimal TotalAmount);

app.MapGet("/orders/{id:int}", async (int id, AppDbContext dbContext) =>
{
    var order = await dbContext.Orders.FindAsync(id);
    if (order is null)
    {
        return Results.NotFound();
    }

    // API に公開する値だけを response DTO に詰め替えます。
    var response = new OrderResponse(
        order.Id,
        order.CustomerName,
        order.TotalAmount);

    return Results.Ok(response);
});
```

## Request DTO と Domain Model

```csharp
public record CreateOrderRequest(string CustomerName, List<CreateOrderLineRequest> Lines);
public record CreateOrderLineRequest(string ProductCode, int Quantity);

public class Order
{
    private readonly List<OrderLine> lines = new();

    public IReadOnlyList<OrderLine> Lines => lines;
    public string CustomerName { get; }

    public Order(string customerName)
    {
        if (string.IsNullOrWhiteSpace(customerName))
        {
            throw new ArgumentException("顧客名は必須です。", nameof(customerName));
        }

        CustomerName = customerName;
    }

    public void AddLine(string productCode, int quantity)
    {
        if (quantity <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(quantity), "数量は1以上にします。");
        }

        lines.Add(new OrderLine(productCode, quantity));
    }
}

public record OrderLine(string ProductCode, int Quantity);
```

悪い例では、DB Entity を API response としてそのまま返しています。これは短く書けますが、内部メモや管理用項目が外へ出る危険があります。また、DB の列名や構造変更が API 契約の変更に直結します。

改善例では、外部へ返す値を `OrderResponse` に限定しています。Request DTO と Domain Model の例では、外部入力は DTO で受け、業務ルールは `Order` の constructor や `AddLine` に置いています。

## 実務での使い方

API 境界では Request / Response DTO を使い、業務ルールは Domain Model に寄せます。DB 永続化の都合が強い型は Infrastructure 側に閉じ、外部公開する契約とは分けます。

AutoMapper のような mapper を使うか、手書き mapping にするかは、変換の複雑さと見通しで判断します。業務上の意味がある変換は、暗黙的に隠しすぎず、明示的に書く方がレビューしやすい場合があります。

## 関連リンク

- [Common web application architectures](https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures)
- [Data Transfer Object](https://learn.microsoft.com/previous-versions/msp-n-p/ff649585(v=pandp.10))
