# Dictionary

## 目的

キーから値を高速に取り出す `Dictionary<TKey, TValue>` を理解します。

## 要点

- Dictionary はキーと値の組み合わせを管理します。商品コードから商品情報、user ID から user object、設定名から値など、キーで高速に引きたい場面で使います。
- キーは重複できません。同じキーで追加しようとすると例外になるため、上書きしたいのか、重複をエラーにしたいのかを先に決めます。
- 存在しないキーを `dict[key]` で直接参照すると例外になります。存在しない可能性がある検索では `TryGetValue` を優先します。
- 文字列キーでは大文字小文字の扱いを決めます。`StringComparer.OrdinalIgnoreCase` などを constructor に渡すと、意図した比較ルールで key を扱えます。
- 一覧を何度も検索する場合、毎回 `FirstOrDefault` で探すより、先に `ToDictionary` で lookup 用 Dictionary を作る方が読みやすく速いことがあります。
- 注意: `dict[key]` で存在しないキーを参照する。
- 注意: 大文字小文字の扱いを決めずに文字列キーを使う。
- 注意: Dictionary に業務ルールを隠しすぎて、意図が読みにくくなる。

## コード例

```csharp
// この例では「Dictionary」の要点を最小のコードで確認します。
var prices = new Dictionary<string, decimal>
{
    ["apple"] = 120m,
    ["orange"] = 150m
};

if (prices.TryGetValue("apple", out var price))
{
    Console.WriteLine(price);
}
```

## ToDictionary で lookup を作る例

```csharp
var products = new[]
{
    new Product("P-001", "Keyboard", 12000m),
    new Product("P-002", "Mouse", 4500m)
};

// 商品コードで何度も検索するなら、先に Dictionary に変換します。
// 同じ Code が複数あると ToDictionary は例外にするため、重複検出にもなります。
var productsByCode = products.ToDictionary(product => product.Code);

if (productsByCode.TryGetValue("P-001", out var product))
{
    Console.WriteLine($"{product.Name}: {product.Price:N0}円");
}

public record Product(string Code, string Name, decimal Price);
```

## 文字列キーの比較ルール

```csharp
// 商品コードの大文字小文字を区別しない lookup にします。
var namesByCode = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
{
    ["P-001"] = "Keyboard"
};

Console.WriteLine(namesByCode["p-001"]); // Keyboard
```

## 実務での使い方

コード値から名称を引く、ID からオブジェクトを探す、集計途中の値を保持する、といった場面で使います。キーの存在チェックには `TryGetValue` を優先します。

`Join` と Dictionary lookup の判断は [SelectMany と Join](08_SelectManyとJoin.md) と合わせて確認します。取得系 LINQ との違いは [取得系 LINQ の使い分け](15_取得系LINQの使い分け.md) で扱います。

## 関連リンク

- [Dictionary<TKey,TValue>](https://learn.microsoft.com/dotnet/api/system.collections.generic.dictionary-2)
