# Environment と設定値

## 目的

環境変数や実行環境の情報を取得する基本を理解します。

## 要点

- `Environment.GetEnvironmentVariable` で環境変数を取得できます。
- 実務では秘密情報や環境差分をコードに直書きしません。
- ASP.NET Core では `IConfiguration` と `appsettings` を使うことが多いです。
- 注意: 秘密情報をソースコードや Git に入れる。
- 注意: 開発環境のパスを前提にして本番で壊れる。
- 注意: 設定値がない場合の扱いを決めていない。

## コード例

```csharp
// この例では「Environment と設定値」の要点を最小のコードで確認します。
var environmentName = Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT") ?? "Production";

Console.WriteLine(environmentName);
Console.WriteLine(Environment.CurrentDirectory);
Console.WriteLine(Environment.MachineName);
```

## 実務での使い方

DB 接続文字列、API キー、環境名、外部サービス URL などは環境ごとに変わります。コードに埋め込まず、設定として注入できる形にします。

## 関連リンク

- [Environment](https://learn.microsoft.com/dotnet/api/system.environment)
