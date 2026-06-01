# Stream と FileStream

## 目的

大きなデータや逐次処理で使う `Stream` と `FileStream` の基本を理解します。

## 前提

- [File / Directory / Path](03_FileDirectoryPath.md) を読んでいる
- [IDisposable と using](11_IDisposableとusing.md) を読んでいる

## 要点

- `Stream` は byte の流れを読む・書くための抽象型です。
- `FileStream` はファイルに対する stream です。
- 小さなテキストなら `File.ReadAllText` で十分ですが、大きなファイルや逐次処理では stream を使います。
- 注意: 大きなファイルを `ReadAllBytes` で一度に読み込み、メモリを圧迫する。
- 注意: stream の位置を意識せず、読み終わった stream をそのまま再利用する。
- 注意: `Dispose` せず file handle を開いたままにする。
- 注意: 文字列データなのに encoding を考えない。

## コード例

```csharp
// この例では「Stream と FileStream」の要点を最小のコードで確認します。
var sourcePath = Path.Combine(Environment.CurrentDirectory, "source.bin");
var destinationPath = Path.Combine(Environment.CurrentDirectory, "copy.bin");

// ファイル全体を一度にメモリへ載せず、stream 経由でコピーします。
await using var source = new FileStream(sourcePath, FileMode.Open, FileAccess.Read);
await using var destination = new FileStream(destinationPath, FileMode.Create, FileAccess.Write);

await source.CopyToAsync(destination);
```

`FileStream` は `IDisposable` / `IAsyncDisposable` を実装しています。`await using` により、非同期の破棄処理まで待ってから resource を解放します。`CopyToAsync` は読み取りと書き込みを分割して行うため、大きなファイルでも扱いやすくなります。

## 実務での使い方

アップロードファイル、CSV 変換、画像や PDF、バックアップ、外部 storage 連携で使います。Web API では request body や response body も stream として扱う場面があります。

## 関連リンク

- [Stream Class](https://learn.microsoft.com/dotnet/api/system.io.stream)
- [FileStream Class](https://learn.microsoft.com/dotnet/api/system.io.filestream)
- [File and stream I/O](https://learn.microsoft.com/dotnet/standard/io/)
