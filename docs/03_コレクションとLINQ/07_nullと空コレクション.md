# null と空コレクション

## 目的

コレクションで null と空をどう扱うかを理解し、呼び出し側が扱いやすい API を書けるようにします。

## 要点

- null は「値がない」、空コレクションは「0件」を表します。
- 一覧を返すメソッドでは、基本的に null ではなく空コレクションを返します。
- 入力として null を受け取る可能性がある場合は、早めに検証します。
- 注意: 0件を null で返す。
- 注意: null と空の意味を決めずに実装する。
- 注意: `items.Count == 0` を呼ぶ前に items が null かどうかを考えていない。

## コード例

```csharp
// この例では「null と空コレクション」の要点を最小のコードで確認します。
static IReadOnlyList<string> FindNames(string keyword)
{
    if (string.IsNullOrWhiteSpace(keyword))
    {
        return Array.Empty<string>();
    }

    return new[] { "Sato", "Suzuki" }
        .Where(name => name.Contains(keyword, StringComparison.OrdinalIgnoreCase))
        .ToList();
}
```

## 実務での使い方

呼び出し側に毎回 null チェックを強制しない API は扱いやすくなります。検索結果が0件であることは異常ではないため、空コレクションとして表すのが自然です。

## 関連リンク

- [Nullable reference types](https://learn.microsoft.com/dotnet/csharp/nullable-references)
