# attributes

## 目的

型やメソッドにメタデータを付ける attributes の基本、自作 attribute、reflection での取得方法を理解します。

## 要点

- attribute は角括弧で付けます。
- フレームワークやライブラリが attribute を読んで動作を変えることがあります。
- ASP.NET Core、テスト、JSON、DI 周辺でよく見ます。
- attribute は型、method、property、assembly などに付けられます。
- 自作 attribute は `Attribute` を継承します。
- attribute を付けるだけでは動かず、読む側の処理が必要です。

- 注意: attribute が何に読まれているか理解しない。
- 注意: 設定を attribute に散らばらせすぎる。
- 注意: 自作 attribute を作っただけで、読む処理を実装していない。
- 注意: `AttributeUsage` を指定せず、意図しない場所に付けられる。
- 注意: reflection を大量に使い、性能やリファクタリング耐性を落とす。

## コード例

```csharp
// この例では「attributes」の要点を最小のコードで確認します。
[Obsolete("Use NewMethod instead.")]
static void OldMethod()
{
}
```

## 自作 attribute の例

```csharp
// この例では、class と method にだけ付けられる監査用 attribute を定義します。
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public sealed class AuditAttribute : Attribute
{
    public AuditAttribute(string action)
    {
        Action = action;
    }

    public string Action { get; }
}

[Audit("注文を作成する")]
public class CreateOrderHandler
{
}
```

## 取得例

```csharp
// attribute は reflection で読み取って初めて実行時の意味を持ちます。
var attribute = typeof(CreateOrderHandler)
    .GetCustomAttributes(typeof(AuditAttribute), inherit: false)
    .OfType<AuditAttribute>()
    .FirstOrDefault();

Console.WriteLine(attribute?.Action);
```

`Obsolete` は compiler や IDE が読み取り、古い API の利用を警告する attribute です。

`AuditAttribute` は class と method にだけ付けられるようにしています。`GetCustomAttributes` で reflection 経由に取得できます。framework の多くは、このように attribute を読み取って動作を変えます。

## 実務での使い方

xUnit の `[Fact]`、ASP.NET Core の `[HttpGet]`、JSON の `[JsonPropertyName]`、validation attribute、source generator、analyzer などで使います。attribute は宣言的で便利ですが、処理の流れが見えにくくなる面もあります。

自作 attribute は便利ですが、読む処理が必要です。設定や DI、明示的な method 呼び出しで表せる場合は、そちらの方が読みやすいことがあります。

## 関連リンク

- [Attributes](https://learn.microsoft.com/dotnet/csharp/advanced-topics/reflection-and-attributes/)
- [AttributeUsageAttribute](https://learn.microsoft.com/dotnet/api/system.attributeusageattribute)
