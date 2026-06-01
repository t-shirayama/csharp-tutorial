# Regex

## 目的

正規表現で文字列の形式チェックや抽出を行う基本を理解します。

## 要点

- `Regex.IsMatch` は形式チェックに使います。
- 複雑な正規表現は読みにくくなりやすいため、名前やコメントで補います。
- 入力検証では正規表現だけに頼りすぎない判断も必要です。
- 注意: 正規表現が複雑すぎて誰も保守できない。
- 注意: `^` と `$` を忘れて部分一致になっている。
- 注意: ユーザー入力の正規表現で性能問題を起こす。

## コード例

```csharp
// この例では「Regex」の要点を最小のコードで確認します。
using System.Text.RegularExpressions;

var postalCode = "123-4567";
var isValid = Regex.IsMatch(postalCode, @"^\d{3}-\d{4}$");

Console.WriteLine(isValid);
```

## 実務での使い方

郵便番号、簡単なコード値、ログ行の抽出などに使います。メールアドレスや URL の完全な検証は難しいため、専用 API や仕様確認を優先します。

## 関連リンク

- [Regular expressions in .NET](https://learn.microsoft.com/dotnet/standard/base-types/regular-expressions)
