# Raw SQL と Dapper 併用

## 目的

EF Core だけでは表現しにくい query や、性能上 SQL を明示したい処理で、Raw SQL と Dapper を安全に使い分けられるようにします。

## 前提

- [EF Core の基本](03_EFCoreの基本.md) を読んでいる
- [EF Core と Dapper と ADO.NET の判断](14_EFCoreとDapperとADONETの判断.md) を読んでいる
- SQL injection の基本的な危険性を理解している

## 要点

- EF Core の LINQ で十分に書ける query は、まず LINQ で書きます。
- 複雑な集計、window function、DB 固有関数、性能調整済み SQL では Raw SQL を検討します。
- user input を SQL 文字列に連結してはいけません。必ず parameter 化します。
- 更新系は transaction、影響件数、監査ログ、rollback 方針を確認します。
- Dapper を併用する場合も、接続文字列、transaction、logging、例外処理の方針を EF Core と揃えます。
- 注意: Raw SQL にした理由、SQL の置き場所、review 観点を残さないと保守できない query が増えます。
- 注意: EF Core と Dapper で別々の transaction を使うと、整合性を壊すことがあります。
- 注意: DB 製品固有の SQL、結果列と DTO / entity の property 名のずれは実行時エラーや移植性問題につながります。

## EF Core の Raw SQL

```csharp
var keyword = "keyboard";

var products = await dbContext.Products
    .FromSql($"""
        SELECT *
        FROM Products
        WHERE Name LIKE {'%' + keyword + '%'}
        ORDER BY Name
        """)
    .AsNoTracking()
    .ToListAsync(cancellationToken);
```

`FromSql` の interpolated string は parameter 化されます。`$"...{keyword}..."` を通常の文字列連結に置き換えないようにします。

## Dapper で読み取り専用 query を書く

```csharp
using Dapper;
using Microsoft.Data.SqlClient;

await using var connection = new SqlConnection(connectionString);

var products = await connection.QueryAsync<ProductListItem>(
    """
    SELECT Id, Name, Price
    FROM Products
    WHERE IsPublished = @IsPublished
    ORDER BY Name
    """,
    new { IsPublished = true });
```

EF Core の例では `FromSql` に SQL を渡し、その後 `AsNoTracking()` を付けています。Raw SQL でも EF Core の query pipeline に乗るため、entity への mapping と tracking の影響を受けます。Dapper の例では SQL と anonymous object の parameter を渡しています。`@IsPublished` に user input を直接連結せず、parameter として渡すのが重要です。

## 実務での使い方

Raw SQL は「LINQ が読みにくい」「DB の実行計画を固定的に調整したい」「既存 SQL を移植する」場合に使います。ただし、query が散らばると保守が難しくなります。SQL を置く場所、test、review 観点、migration との整合性をチームで決めてから導入します。

## 関連リンク

- [EF Core と Dapper と ADO.NET の判断](14_EFCoreとDapperとADONETの判断.md)
- [SQL の基礎](01_SQLの基礎.md)
- [SQL Queries](https://learn.microsoft.com/ef/core/querying/sql-queries)
- [Dapper](https://github.com/DapperLib/Dapper)
