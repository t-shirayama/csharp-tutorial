# reflection

## 目的

実行時に型情報を調べる reflection の入口と、`Type`、`MemberInfo`、`PropertyInfo`、`MethodInfo` など代表的な API を理解します。

## 要点

- reflection は型、プロパティ、メソッド、attribute を実行時に調べられます。
- フレームワークやシリアライザーの内部でよく使われます。
- 通常の業務ロジックでは使いすぎない方が読みやすく安全です。
- `Type` は実行時の型情報を表します。
- `MemberInfo` は field、property、method などの共通基底です。
- `PropertyInfo` や `MethodInfo` で member 情報や値を取得できます。
- reflection は通常の呼び出しより遅く、型安全性も弱くなります。

- 注意: 通常のメソッド呼び出しで済む場所に reflection を使う。
- 注意: プロパティ名を文字列で扱い、リネームに弱くなる。
- 注意: 例外やアクセス権限の扱いを考えない。
- 注意: trim / AOT 環境で reflection 前提のコードが壊れる可能性を考えない。

## コード例

```csharp
// この例では「reflection」の要点を最小のコードで確認します。
var type = typeof(Product);

foreach (var property in type.GetProperties())
{
    Console.WriteLine($"{property.Name}: {property.PropertyType.Name}");
}

public class Product
{
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}
```

## 値の取得例

```csharp
// この例では、property 名を nameof で指定して値を取り出します。
var product = new Product();
var nameProperty = typeof(Product).GetProperty(nameof(Product.Name));
var value = nameProperty?.GetValue(product);

Console.WriteLine(value);
```

`typeof(Product)` で `Product` の型情報を取得します。`GetProperties` は public property の一覧を返します。`PropertyInfo.PropertyType` で property の型を確認できます。

`GetValue` を使うと、object から property の値を実行時に取り出せます。property 名を文字列で直接書くと rename に弱くなるため、可能なら `nameof` を使います。

## 実務での使い方

serializer、mapper、DI container、test helper、plugin、attribute 読み取りで使われます。自分で使う前に、既存 framework が解いている問題ではないか確認します。

Native AOT や trimming を使う場合、reflection で参照される member が削除対象になることがあります。library や app の方針に合わせて source generator や明示的な metadata 指定を検討します。

## 関連リンク

- [Reflection](https://learn.microsoft.com/dotnet/fundamentals/reflection/reflection)
- [Type Class](https://learn.microsoft.com/dotnet/api/system.type)
- [MemberInfo Class](https://learn.microsoft.com/dotnet/api/system.reflection.memberinfo)
