# IDisposable と using

## 目的

明示的に解放が必要な resource と、`IDisposable` / `using` の使い方を理解します。

## 前提

- [File / Directory / Path](03_FileDirectoryPath.md) を読んでいる
- [HttpClient](06_HttpClient.md) を読んでいる

## 要点

- `IDisposable` は、使い終わった resource を明示的に解放するための interface です。
- `using` statement / declaration を使うと、scope を抜けるときに `Dispose` が呼ばれます。
- managed object のメモリ解放は GC が担当しますが、file handle や DB connection などは早めに閉じる必要があります。
- 注意: `IDisposable` な object を作ったまま破棄しない。
- 注意: DI container が管理する service を手動で `Dispose` する。
- 注意: `HttpClient` を request ごとに `using` し、接続プールを壊す。
- 注意: `Dispose` 後の object を再利用する。

## コード例

```csharp
// この例では「IDisposable と using」の要点を最小のコードで確認します。
var path = Path.Combine(Environment.CurrentDirectory, "sample.txt");

// using declaration により、scope を抜けると StreamWriter.Dispose が呼ばれます。
using var writer = new StreamWriter(path, append: false, Encoding.UTF8);
writer.WriteLine("Hello");
```

`StreamWriter` はファイルを開くため、使い終わったら閉じる必要があります。`using var` は例外が発生した場合でも scope 終了時に `Dispose` を呼び、file handle を解放します。

## 実務での使い方

ファイル、stream、DB connection、transaction、HTTP response、timer、container などで出てきます。自作 class で `IDisposable` を実装するのは、その class が解放すべき resource を所有している場合です。

## 関連リンク

- [IDisposable Interface](https://learn.microsoft.com/dotnet/api/system.idisposable)
- [using statement](https://learn.microsoft.com/dotnet/csharp/language-reference/statements/using)
- [Implement a Dispose method](https://learn.microsoft.com/dotnet/standard/garbage-collection/implementing-dispose)
