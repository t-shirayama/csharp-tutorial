# Validation

## 目的

API に入力される値を検証し、安全に業務処理へ渡す方法を理解します。

## 要点

- 必須、長さ、範囲、形式、業務ルールを検証します。
- 入力 validation と業務 validation を分けて考えます。
- エラーレスポンスは利用者が修正できる内容にします。
- 単純な入力制約は Data Annotations、複雑な条件は FluentValidation などの library を検討します。

- 注意: Controller だけで業務ルールまで検証する。
- 注意: エラーメッセージが利用者に分かりにくい。
- 注意: クライアント側 validation だけに頼る。
- 注意: validation 失敗をすべて 500 error として返す。

## コード例

```csharp
// この例では「Validation」の要点を最小のコードで確認します。
public record CreateProductRequest(string Name, decimal Price);

static IResult Create(CreateProductRequest request)
{
    // 入力 DTO の形だけでは、空文字や業務上不正な値までは防げません。
    if (string.IsNullOrWhiteSpace(request.Name)) return Results.BadRequest("Name is required.");
    if (request.Price < 0) return Results.BadRequest("Price must be greater than or equal to 0.");

    return Results.Ok();
}
```

## Data Annotations の例

```csharp
// この例では属性で単純な入力制約を表します。
public sealed class CreateProductRequest
{
    [Required]
    [StringLength(100)]
    public string Name { get; init; } = string.Empty;

    [Range(0, 1_000_000)]
    public decimal Price { get; init; }
}
```

Data Annotations は標準機能で始めやすく、DTO の単純な必須・桁数・範囲に向いています。一方で、複数 property をまたぐ条件や外部 repository を使う検証は肥大化しやすくなります。

## FluentValidation を検討する場面

```csharp
// この例では複雑な validation rule を DTO から分離します。
public sealed class CreateProductRequestValidator : AbstractValidator<CreateProductRequest>
{
    public CreateProductRequestValidator()
    {
        RuleFor(request => request.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(request => request.Price)
            .GreaterThanOrEqualTo(0);
    }
}
```

FluentValidation は外部 package です。rule を class として分離できるため、複雑な validation、条件付き validation、test しやすさを重視する場合に候補になります。

## 実務での使い方

DTO の入力検証、ドメインルール、DB 制約を重ねて安全性を作ります。どの層で何を保証するかを決めます。

実務では、HTTP の入力形式チェック、業務ルール、DB 制約を混ぜないことが重要です。例えば「名前が空ではない」は入力 validation、「注文できる在庫がある」は業務 validation、「SKU が一意」は DB 制約でも守ります。


## 関連リンク

- [Model validation](https://learn.microsoft.com/aspnet/core/mvc/models/validation)
- [FluentValidation](https://docs.fluentvalidation.net/)
