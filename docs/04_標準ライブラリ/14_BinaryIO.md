# Binary I/O

## 目的

`BinaryReader`、`BinaryWriter`、`BinaryPrimitives` の入口を理解します。

## 前提

- [Stream と FileStream](12_StreamとFileStream.md) を読んでいる

## 要点

- binary I/O は byte 単位の形式を読み書きします。
- 独自 binary format、通信 protocol、画像や音声の header 解析で出てきます。
- 文字列ファイルと違い、endianness や format version を意識します。
- 注意: 書き込み順と読み取り順を変える。
- 注意: endianness を考慮しない。
- 注意: format version を持たず、将来変更できなくなる。
- 注意: text data なのに binary として扱い、調査しにくくする。

## コード例

```csharp
// この例では「Binary I/O」の要点を最小のコードで確認します。
var path = Path.Combine(Environment.CurrentDirectory, "data.bin");

await using (var stream = new FileStream(path, FileMode.Create, FileAccess.Write))
using (var writer = new BinaryWriter(stream, Encoding.UTF8))
{
    writer.Write(123);
    writer.Write("CSharp");
}

await using (var stream = new FileStream(path, FileMode.Open, FileAccess.Read))
using (var reader = new BinaryReader(stream, Encoding.UTF8))
{
    int number = reader.ReadInt32();
    string text = reader.ReadString();
    Console.WriteLine($"{number}: {text}");
}
```

書き込んだ順番と同じ順番で読み取っています。binary format は順序や型がずれると正しく読めません。長期保存や外部連携では format version を持たせる設計が重要です。

## 実務での使い方

業務アプリでは JSON や CSV の方が多いですが、性能やサイズ、既存 protocol の都合で binary を扱うことがあります。独自 format を作る前に、既存仕様や serializer を検討します。

## 関連リンク

- [BinaryReader Class](https://learn.microsoft.com/dotnet/api/system.io.binaryreader)
- [BinaryWriter Class](https://learn.microsoft.com/dotnet/api/system.io.binarywriter)
- [BinaryPrimitives Class](https://learn.microsoft.com/dotnet/api/system.buffers.binary.binaryprimitives)
