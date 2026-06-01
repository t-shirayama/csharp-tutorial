# string

## 目的

文字列の比較、結合、分割、検索、空チェックを実務で安全に扱えるようにします。

## 要点

- `string` は不変です。変更しているように見える操作は新しい文字列を作ります。
- 空文字と null は意味が違います。
- 比較では大文字小文字やカルチャを意識します。
- 注意: null チェックなしで `Trim()` を呼ぶ。
- 注意: 文字列比較で大文字小文字やカルチャを考えない。
- 注意: ループ内で大量の文字列連結を行う。

## コード例

```csharp
// この例では「string」の要点を最小のコードで確認します。
var name = "  Sato  ";
var normalized = name.Trim();

Console.WriteLine(string.IsNullOrWhiteSpace(normalized));
Console.WriteLine(normalized.Contains("sa", StringComparison.OrdinalIgnoreCase));
Console.WriteLine($"Hello, {normalized}");
```

## 実務での使い方

入力値の前後空白除去、必須チェック、コード値の比較、ログメッセージ作成で頻出します。大量の連結には `StringBuilder` も検討します。

## 関連リンク

- [String](https://learn.microsoft.com/dotnet/api/system.string)
