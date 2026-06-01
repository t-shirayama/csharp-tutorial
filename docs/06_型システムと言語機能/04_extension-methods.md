# extension methods

## 目的

既存の型にメソッドを追加したように見せる extension methods を理解します。

## 要点

- `static` クラスの `static` メソッドに `this` を付けて定義します。呼び出し側からは、元の型に method が増えたように見えます。
- 元の型を変更できない場合に便利です。`string`、`DateTimeOffset`、`IServiceCollection`、外部 library の型などへ、プロジェクト固有の読みやすい操作を足せます。
- LINQ も extension methods として提供されています。`Where` や `Select` が collection に直接生えているように見えるのは、この仕組みによるものです。
- extension method は見つけやすさが重要です。汎用的すぎる名前や広すぎる namespace に置くと、どこから来た method か分かりにくくなります。
- 状態を持つ処理、外部 API や DB に依存する処理、複雑な業務判断は extension method より service に置く方が自然なことが多いです。

- 注意: どこに定義されたメソッドか分かりにくくなる。
- 注意: 何でも extension method にして責務が散らばる。
- 注意: null を受け取るかどうかを明示しない。

## コード例

```csharp
// この例では「extension methods」の要点を最小のコードで確認します。
var text = "  hello  ";
Console.WriteLine(text.TrimToNull());

public static class StringExtensions
{
    public static string? TrimToNull(this string? value)
    {
        var trimmed = value?.Trim();
        return string.IsNullOrEmpty(trimmed) ? null : trimmed;
    }
}
```

## IServiceCollection 拡張の例

```csharp
public static class OrderServiceCollectionExtensions
{
    public static IServiceCollection AddOrderFeature(this IServiceCollection services)
    {
        // Order 機能に必要な DI 登録を1か所にまとめます。
        services.AddScoped<IOrderService, OrderService>();
        return services;
    }
}
```


## 実務での使い方

文字列正規化、日付変換、DTO 変換、IServiceCollection の登録拡張などで使います。プロジェクト全体に見えるため、名前と責務を慎重に決めます。

DI 登録を extension method にまとめる例は [DI コンテナの実装](../07_設計と実務パターン/09_DIコンテナの実装.md) と合わせて読むと理解しやすいです。

## 関連リンク

- [Extension methods](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/extension-methods)
