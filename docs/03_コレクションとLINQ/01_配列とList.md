# 配列と List

## 目的

複数の値を扱う基本として、配列と `List<T>` の違いを理解します。

## 要点

- 配列は要素数が固定です。最初から件数が決まっている値、API が配列を要求する場面、範囲処理や低レベル API と組み合わせる場面で使います。
- `List<T>` は要素の追加や削除がしやすい可変長のコレクションです。入力値一覧、検索結果、明細行など、件数が変わるデータでは `List<T>` を使うことが多いです。
- 実務では、内部では `List<T>` で扱い、外部へ返すときは `IReadOnlyList<T>` や `IEnumerable<T>` にすることがあります。呼び出し側に変更させたいのか、読み取りだけ許したいのかを型で表します。
- index access が必要なら配列や `IReadOnlyList<T>`、順に処理できれば十分なら `IEnumerable<T>`、重複排除が目的なら `HashSet<T>` など、目的に応じて collection を選びます。
- null と空リストは意味が違います。一覧の検索結果が0件なら空 collection、値そのものが存在しないなら null など、API の契約を決めてから実装します。
- 注意: 配列の範囲外にアクセスする。
- 注意: `List<T>` を外部にそのまま公開し、どこからでも変更できるようにする。
- 注意: null と空リストを同じものとして扱う。

## コード例

```csharp
// この例では「配列と List」の要点を最小のコードで確認します。
var names = new[] { "Sato", "Suzuki" };
Console.WriteLine(names[0]);

var scores = new List<int> { 80, 90 };
scores.Add(75);

foreach (var score in scores)
{
    Console.WriteLine(score);
}
```

## 読み取り専用として返す例

```csharp
public class ScoreBoard
{
    private readonly List<int> scores = new();

    // 外部には読み取り専用として見せます。
    // 内部の List<T> は AddScore method 経由でだけ変更します。
    public IReadOnlyList<int> Scores => scores;

    public void AddScore(int score)
    {
        if (score < 0 || score > 100)
        {
            throw new ArgumentOutOfRangeException(nameof(score), "点数は0から100の範囲です。");
        }

        scores.Add(score);
    }
}
```

## 実務での使い方

検索結果、明細、入力値一覧など、件数が変わるものは `List<T>` や `IReadOnlyList<T>` で扱います。外部に返す場合は、変更可能性を意識します。

collection の公開方法や列挙中の変更については、[コレクションの公開と変更](16_コレクションの公開と変更.md) で扱います。

## 関連リンク

- [Arrays](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/arrays)
- [List&lt;T&gt;](https://learn.microsoft.com/dotnet/api/system.collections.generic.list-1)
