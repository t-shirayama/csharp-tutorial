# using とリソース解放

## 目的

ファイルやストリームなど、使い終わったら明示的に後片付けが必要な object を安全に扱う方法を理解します。

## 前提

- [例外処理の入口](07_例外処理の入口.md) を読んでいる
- [入力と出力](08_入力と出力.md) を読んでいる

## 要点

- .NET の多くの object は GC によって memory が回収されます。ただし、ファイル、ネットワーク接続、DB 接続など、OS や外部 resource を使う object は使い終わったら解放が必要です。
- `IDisposable` を実装している object は、`Dispose()` で後片付けできます。通常は自分で `Dispose()` を直接呼ぶより、`using` を使って確実に解放します。
- `using` statement はブロックを抜けるときに解放します。例外が起きた場合でも解放されるため、`try` / `finally` を手書きするより読みやすくなります。
- `using` declaration は宣言したスコープの終わりで解放します。短い処理では読みやすいですが、解放タイミングが広くなりすぎないように注意します。
- `File.ReadAllText` や `File.WriteAllText` のように、内部で開閉まで行う便利 API もあります。小さなファイルを一括で読むだけなら、まずは標準の簡単な API から使います。
- 実務では、`HttpClient`、DB connection、stream、transaction などの寿命管理が重要です。基礎段階では、`IDisposable` を見たら using を検討する、と覚えます。
- 注意: `IDisposable` な object を作ったまま解放しない。
- 注意: `using` declaration のスコープが広すぎて、想定より長くファイルを開いたままにする。
- 注意: 小さなファイル処理で stream を手書きしすぎて、かえって複雑にする。
- 注意: `finally` で手動解放するコードを書き、null check や例外時の扱いを漏らす。

## using statement

```csharp
var path = "sample.txt";

// StreamWriter は IDisposable なので、using で確実に閉じます。
using (var writer = new StreamWriter(path))
{
    writer.WriteLine("Hello");
    writer.WriteLine("C#");
}

Console.WriteLine("ファイルを書き込みました。");
```

## using declaration

```csharp
var path = "sample.txt";

// この変数は、現在のスコープを抜けるときに Dispose されます。
using var reader = new StreamReader(path);

var content = reader.ReadToEnd();
Console.WriteLine(content);
```

## 便利 API を使う場合

```csharp
var path = "sample.txt";

// 小さなテキストを一括で書くなら、File.WriteAllText が簡潔です。
File.WriteAllText(path, "Hello C#");

var content = File.ReadAllText(path);
Console.WriteLine(content);
```

`using (var writer = new StreamWriter(path))` は、ファイルを書き込むための writer を作り、ブロックを抜けるときに閉じる、という意味です。`writer.WriteLine` の途中で例外が起きても、writer の後片付けは行われます。ファイルを閉じ忘れると、他の処理が同じファイルを開けなくなることがあります。

## 実務での使い方

ファイル処理、DB 処理、外部 API 通信、圧縮、暗号化などで resource 管理が出てきます。`using` は例外処理とセットで考える基礎です。業務ロジックでは、resource の寿命を短くし、必要な範囲だけ開いてすぐ閉じる設計にします。

## 関連リンク

- [using statement](https://learn.microsoft.com/dotnet/csharp/language-reference/statements/using)
- [IDisposable Interface](https://learn.microsoft.com/dotnet/api/system.idisposable)
- [File Class](https://learn.microsoft.com/dotnet/api/system.io.file)
