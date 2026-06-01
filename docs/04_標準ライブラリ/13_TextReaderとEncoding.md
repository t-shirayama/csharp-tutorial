# TextReader と Encoding

## 目的

テキストの読み書きに使う `TextReader` / `TextWriter` と、文字コードの扱いを理解します。

## 前提

- [File / Directory / Path](03_FileDirectoryPath.md) を読んでいる
- [Stream と FileStream](12_StreamとFileStream.md) を読んでいる

## 要点

- `TextReader` は文字列として読み取る抽象型です。
- `StreamReader` は stream からテキストを読みます。
- 文字化けを避けるため、encoding を明示します。
- 注意: encoding を指定せず、環境差で文字化けする。
- 注意: 大きなファイルを `ReadToEnd` で一度に読む。
- 注意: 改行コードの差を考慮しない。

## コード例

```csharp
// この例では「TextReader と Encoding」の要点を最小のコードで確認します。
var path = Path.Combine(Environment.CurrentDirectory, "memo.txt");

await File.WriteAllTextAsync(path, "こんにちは", Encoding.UTF8);

using TextReader reader = new StreamReader(path, Encoding.UTF8);
var text = await reader.ReadToEndAsync();

Console.WriteLine(text);
```

`StreamReader` は file stream を文字として読み取る reader です。`Encoding.UTF8` を指定することで、環境の既定 encoding に依存しない読み書きになります。

## 実務での使い方

CSV、固定長ファイル、ログ、外部システム連携で使います。外部から来るファイルは UTF-8 とは限らないため、仕様書や実ファイルで encoding を確認します。

## 関連リンク

- [TextReader Class](https://learn.microsoft.com/dotnet/api/system.io.textreader)
- [StreamReader Class](https://learn.microsoft.com/dotnet/api/system.io.streamreader)
- [Character encoding in .NET](https://learn.microsoft.com/dotnet/standard/base-types/character-encoding)
