# Span と Memory

## 目的

コピーを減らすための `Span<T>`、`ReadOnlySpan<T>`、`Memory<T>` の入口を理解します。

## 前提

- [Index と Range](../03_コレクションとLINQ/13_IndexとRange.md) を読んでいる
- [Stream と FileStream](../04_標準ライブラリ/12_StreamとFileStream.md) を読んでいる

## 要点

- `Span<T>` は連続したメモリ領域を表す stack-only 型です。
- `ReadOnlySpan<T>` は読み取り専用の view です。
- `Memory<T>` は async method や field に保持しやすい wrapper です。
- slicing は元データの view を作るため、コピー削減に役立ちます。
- 注意: `Span<T>` は field に保存できず、async method をまたいで保持できません。
- 注意: 読みやすさより先に micro optimization を優先しないようにします。

## コード例

```csharp
// この例では「Span と Memory」の要点を最小のコードで確認します。
var text = "2026-05-22";
ReadOnlySpan<char> span = text.AsSpan();

var year = span[..4];
var month = span[5..7];
var day = span[8..10];

Console.WriteLine($"{year}/{month}/{day}");
```

`AsSpan` は文字列の view を作ります。`span[..4]` などの slice は、元の文字列を新しい文字列へコピーせずに範囲を参照します。

## 実務での使い方

高頻度 parsing、protocol 処理、buffer 処理、allocation 削減が必要な場面で使います。通常の業務ロジックでは、読みやすさを優先して string や collection を使って問題ありません。

## 関連リンク

- [Memory and spans](https://learn.microsoft.com/dotnet/standard/memory-and-spans/)
- [Span&lt;T&gt;](https://learn.microsoft.com/dotnet/api/system.span-1)
- [Memory&lt;T&gt;](https://learn.microsoft.com/dotnet/api/system.memory-1)
