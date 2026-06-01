# タプルと dynamic

## 目的

複数の値を一時的にまとめる tuple と、実行時に解決される `dynamic` の使いどころを理解します。

## 前提

- [変数と型](02_変数と型.md) を読んでいる
- [メソッド](05_メソッド.md) を読んでいる

## 要点

- tuple は複数の値を軽くまとめるために使います。
- 戻り値が 2〜3 個の小さな補助処理では tuple が便利です。
- `dynamic` は compile 時の型チェックを弱め、実行時に member を解決します。
- 実務では `dynamic` の利用は限定的にします。
- 注意: public API の戻り値に tuple を多用し、意味が読み取りにくくなる。
- 注意: tuple の要素名を付けず、`Item1`、`Item2` だらけにする。
- 注意: `dynamic` で compile 時の安全性を失う。

## コード例

```csharp
// この例では「タプルと dynamic」の要点を最小のコードで確認します。
static (string Name, int Count) GetSummary(string[] items)
{
    // 名前付き tuple で、戻り値の意味を呼び出し側へ伝えます。
    return (Name: "items", Count: items.Length);
}

var summary = GetSummary(["A", "B"]);
Console.WriteLine($"{summary.Name}: {summary.Count}");
```

## dynamic の例

```csharp
// この例では「タプルと dynamic」の要点を最小のコードで確認します。
dynamic value = "Hello";

// 実行時に string.Length が解決されます。
Console.WriteLine(value.Length);
```

tuple は小さな戻り値のまとまりです。長く使い回すデータや業務上の意味が強い値は、record や class にした方が読みやすくなります。`dynamic` は便利ですが、存在しない member を呼んでも compile error にならず、実行時エラーになります。

## 実務での使い方

tuple は private method の小さな戻り値や、LINQ の中間結果で使います。`dynamic` は COM、古い API、JSON の一時調査などで使うことがありますが、通常は型を定義します。

## 関連リンク

- [Tuple types](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/value-tuples)
- [dynamic type](https://learn.microsoft.com/dotnet/csharp/advanced-topics/interop/using-type-dynamic)
