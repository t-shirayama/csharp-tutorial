# 属性と Reflection の実務利用

## 目的

attribute を付ける側と reflection で読む側の関係を理解し、実務で使う場面と避ける場面を判断できるようにします。

## 前提

- [attributes](05_attributes.md) を読んでいる
- [reflection](06_reflection.md) を読んでいる

## 要点

- 実務で attribute を使う代表例は、ASP.NET Core の routing、xUnit の test marker、System.Text.Json の property 名指定、validation attribute などです。
- reflection は柔軟ですが、型安全性、性能、リファクタリング耐性に注意が必要です。property 名を文字列で扱う code は rename に弱くなります。
- Native AOT や trimming を使う場合、reflection で参照される member が削除対象になることがあります。library や app の方針に合わせて source generator や明示的な metadata 指定を検討します。
- 通常の業務ロジックでは、まず直接呼び出し、interface、generic、手書き mapping で表せないかを考えます。reflection は共通基盤や framework 連携に閉じると読みやすくなります。

## よく使う attribute の例

```csharp
using System.Text.Json.Serialization;

public record ProductResponse(
    [property: JsonPropertyName("product_code")] string ProductCode,
    [property: JsonPropertyName("display_name")] string DisplayName);
```

`JsonPropertyName` は System.Text.Json が読み取る attribute です。C# の property 名と JSON の property 名を分けたい場合に使います。

## 自作 attribute の例

```csharp
[AttributeUsage(AttributeTargets.Property)]
public class ExportColumnAttribute : Attribute
{
    public ExportColumnAttribute(string name)
    {
        Name = name;
    }

    public string Name { get; }
}

public class ProductExportRow
{
    [ExportColumn("商品コード")]
    public string Code { get; set; } = "";

    [ExportColumn("商品名")]
    public string Name { get; set; } = "";
}
```

## reflection で attribute を読む例

```csharp
var properties = typeof(ProductExportRow).GetProperties();

foreach (var property in properties)
{
    var column = property
        .GetCustomAttributes(typeof(ExportColumnAttribute), inherit: false)
        .OfType<ExportColumnAttribute>()
        .FirstOrDefault();

    if (column is null)
    {
        continue;
    }

    Console.WriteLine($"{property.Name} => {column.Name}");
}
```

## reflection を使わない例

```csharp
public static ProductCsvRow ToCsvRow(Product product)
{
    // 変換規則が少ないなら、手書き mapping の方が読みやすく安全です。
    return new ProductCsvRow(product.Code, product.Name);
}

public record Product(string Code, string Name);
public record ProductCsvRow(string ProductCode, string ProductName);
```

## コードの読み方

自作 attribute の例では、`ExportColumnAttribute` を property に付けています。ただし、この時点では何も出力されません。次の reflection の例で `GetProperties()` と `GetCustomAttributes()` を使い、attribute を読み取って初めて意味を持ちます。

最後の例は、reflection を使わず手書きで mapping する方法です。対象が少なく、変換規則が明確な場合は、この方がリネームやテストに強くなります。

## よくあるミス

- attribute を付ければ自動で処理されると思い込む。
- 自作 attribute を作ったが、それを読む処理がどこにもない。
- reflection で property 名を文字列指定し、rename に弱い実装にする。
- 通常の method 呼び出しで十分な場所に reflection を使う。
- AOT / trimming を使う環境で、reflection 前提の code が動くか確認しない。

## 実務での使い方

framework 連携では attribute をよく使います。自作 attribute と reflection は、CSV export、監査ログ、簡易 mapper、plugin discovery などで候補になります。ただし、業務処理の中心に reflection を広げると読みにくくなるため、共通基盤や変換境界に閉じ込めます。

performance が重要な処理では、reflection の結果を cache する、source generator を使う、手書き mapping にするなどの選択肢を比較します。

## 関連リンク

- [Attributes](https://learn.microsoft.com/dotnet/csharp/advanced-topics/reflection-and-attributes/)
- [Reflection](https://learn.microsoft.com/dotnet/fundamentals/reflection/reflection)
- [System.Text.Json customization](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/customize-properties)
