# Index と Range

## 目的

`^` と `..` を使った index / range 構文を理解します。

## 前提

- [配列と List](01_配列とList.md) を読んでいる

## 要点

- `^1` は末尾から 1 番目を表します。
- `1..4` は開始 index 以上、終了 index 未満の範囲を表します。
- 配列、文字列、span などで使えます。
- 注意: range の終了 index が含まれると思い込む。
- 注意: 空配列に `^1` を使って例外にする。
- 注意: コピーが発生する場面で、大きな配列を頻繁に slice する。

## コード例

```csharp
// この例では「Index と Range」の要点を最小のコードで確認します。
var numbers = new[] { 10, 20, 30, 40, 50 };

Console.WriteLine(numbers[^1]); // 50

var middle = numbers[1..4];
Console.WriteLine(string.Join(",", middle)); // 20,30,40
```

`numbers[^1]` は最後の要素です。`numbers[1..4]` は index 1 から 3 までの範囲を取り出します。終了位置は含まれない点に注意します。

## 実務での使い方

文字列の一部取り出し、配列の範囲処理、ログの先頭・末尾の抽出で使います。大きなデータでコピーを避けたい場合は `Span<T>` や `Memory<T>` も検討します。

## 関連リンク

- [Indices and ranges](https://learn.microsoft.com/dotnet/csharp/tutorials/ranges-indexes)
