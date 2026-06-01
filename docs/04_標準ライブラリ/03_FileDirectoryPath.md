# File / Directory / Path

## 目的

ファイル、ディレクトリ、パスを安全に扱う基本を理解します。

## 要点

- `File` はファイルの読み書き、`Directory` はフォルダ操作に使います。
- パス結合には文字列連結ではなく `Path.Combine` を使います。
- 文字コードと例外処理を意識します。
- 注意: `+ "\\" +` のような文字列連結でパスを作る。
- 注意: ファイルが存在する前提で読み込む。
- 注意: 文字コードを指定せず、環境差で文字化けする。

## コード例

```csharp
// この例では「File / Directory / Path」の要点を最小のコードで確認します。
var directory = Path.Combine(Environment.CurrentDirectory, "output");
Directory.CreateDirectory(directory);

var filePath = Path.Combine(directory, "memo.txt");
File.WriteAllText(filePath, "Hello", Encoding.UTF8);

var text = File.ReadAllText(filePath, Encoding.UTF8);
Console.WriteLine(text);
```

## 実務での使い方

CSV 出力、ログ確認、設定ファイル読み込み、アップロードファイル処理などで使います。ユーザー入力のファイル名は検証し、上書きやパストラバーサルに注意します。

## 関連リンク

- [File](https://learn.microsoft.com/dotnet/api/system.io.file)
- [Path](https://learn.microsoft.com/dotnet/api/system.io.path)
