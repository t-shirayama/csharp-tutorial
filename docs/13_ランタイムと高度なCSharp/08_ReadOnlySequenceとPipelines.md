# ReadOnlySequence と Pipelines

## 目的

分割された buffer を扱う `ReadOnlySequence<T>` と、stream 処理を効率化する `System.IO.Pipelines` の入口を理解します。

## 前提

- [Span と Memory](07_SpanとMemory.md) を読んでいる
- [Stream と FileStream](../04_標準ライブラリ/12_StreamとFileStream.md) を読んでいる

## 要点

- `ReadOnlySequence<T>` は複数 segment に分かれた連続データを表します。
- `PipeReader` / `PipeWriter` は producer / consumer 形式の buffer 処理を支援します。
- ASP.NET Core の内部や高性能 I/O で使われます。
- 通常の業務コードでは stream で十分なことが多いです。
- 注意: 単純なファイル処理に Pipelines を持ち込むと、必要以上に複雑になります。
- 注意: buffer の消費位置を進めないと、同じデータを読み続けます。
- 注意: 複数 segment にまたがる値は、単一 span 前提で処理しないようにします。

## コード例

```csharp
// この例では「ReadOnlySequence と Pipelines」の要点を最小のコードで確認します。
using System.Buffers;

var data = new byte[] { 1, 2, 3, 4 };
var sequence = new ReadOnlySequence<byte>(data);

foreach (var segment in sequence)
{
    foreach (var value in segment.Span)
    {
        Console.WriteLine(value);
    }
}
```

`ReadOnlySequence<byte>` は 1 つ以上の memory segment から成るデータ列を表します。単一配列でも作れますが、本領は複数 buffer にまたがるデータ処理です。

## 実務での使い方

高性能な network protocol、独自 parser、streaming 処理、ASP.NET Core の低レイヤーで使います。まず `Stream`、`Span<T>`、`Memory<T>` を理解してから学ぶと読みやすくなります。

## 関連リンク

- [System.IO.Pipelines](https://learn.microsoft.com/dotnet/standard/io/pipelines)
- [ReadOnlySequence&lt;T&gt;](https://learn.microsoft.com/dotnet/api/system.buffers.readonlysequence-1)
