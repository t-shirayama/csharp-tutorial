# ADO.NET の入口

## 目的

.NET の低レベルな DB アクセス API である ADO.NET の位置づけを理解します。

## 要点

- ADO.NET は接続、コマンド、データ読み取りを直接扱います。
- EF Core より低レベルで、細かい制御ができます。
- SQL Injection を避けるため、パラメーターを使います。

- 注意: SQL 文字列にユーザー入力を連結する。
- 注意: connection や reader を dispose しない。
- 注意: 例外時のトランザクション扱いを決めない。

## コード例

```csharp
// この例では「ADO.NET の入口」の要点を最小のコードで確認します。
using var connection = new SqlConnection(connectionString);
await connection.OpenAsync();

using var command = connection.CreateCommand();
command.CommandText = "SELECT Name FROM Products WHERE Id = @id";
command.Parameters.AddWithValue("@id", id);
```

## 実務での使い方

既存システム、性能重視の処理、ストアドプロシージャ呼び出しで見かけます。通常の CRUD は EF Core の方が生産性が高いことも多いです。


## 関連リンク

- [ADO.NET](https://learn.microsoft.com/dotnet/framework/data/adonet/)
