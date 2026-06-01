# StringBuilder

## 目的

大量の文字列連結で `StringBuilder` を使う理由と使いどころを理解します。

## 前提

- [string](01_string.md) を読んでいる

## 要点

- `string` は immutable なので、連結のたびに新しい文字列が作られます。
- 少数の連結なら interpolation や `+` で十分です。
- loop で大量に連結する場合は `StringBuilder` を検討します。
- 注意: 少数の文字列連結まで `StringBuilder` にして読みにくくする。
- 注意: `ToString()` を loop の中で何度も呼ぶ。
- 注意: SQL や HTML を安全化せずに文字列連結する。

## コード例

```csharp
// この例では loop で複数行の文字列を組み立てます。
var builder = new StringBuilder();

foreach (var name in new[] { "Sato", "Suzuki", "Takahashi" })
{
    builder.AppendLine($"Hello, {name}");
}

var message = builder.ToString();
Console.WriteLine(message);
```

`AppendLine` で内部 buffer に文字列を追加し、最後に `ToString()` で 1 つの文字列へ確定します。loop の中で `message += ...` を繰り返すより、意図が明確で allocation を抑えやすくなります。

## 実務での使い方

ログ本文、CSV 生成、メール本文、SQL ではない動的な text 生成で使います。SQL を組み立てる目的では、SQL injection を避けるため parameterized query を優先します。

## 関連リンク

- [StringBuilder Class](https://learn.microsoft.com/dotnet/api/system.text.stringbuilder)
