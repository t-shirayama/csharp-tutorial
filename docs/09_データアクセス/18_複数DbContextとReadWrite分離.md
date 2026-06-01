# 複数 DbContext と Read / Write 分離

## 目的

中規模以上のアプリで DbContext が肥大化したときに、複数 DbContext、read / write 分離、transaction 境界を判断できるようにします。

## 前提

- [DbContext と Entity](04_DbContextとEntity.md) を読んでいる
- [Transaction](06_Transaction.md) を読んでいる
- [Repository パターンの判断](11_Repositoryパターンの判断.md) を読んでいる

## 要点

- DbContext は database そのものではなく、unit of work と entity mapping の境界です。
- bounded context が分かれる場合、DbContext を分ける選択肢があります。
- read model と write model を分けると、一覧取得を軽くしやすい一方で整合性の設計が必要です。
- 同じ transaction で複数 DbContext を扱う設計は複雑です。まず境界を小さくします。
- migration の管理単位、connection string、schema、test 方針を先に決めます。
- 注意: 責務が曖昧なまま DbContext だけ増やすと、migration や transaction 境界が分かりにくくなります。
- 注意: read model を更新処理に使わないようにし、同期遅延がある場合は API 仕様にも反映します。
- 注意: transaction 境界を広げすぎると、障害時の復旧が難しくなります。

## DbContext を分ける例

```csharp
builder.Services.AddDbContext<SalesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Sales")));

builder.Services.AddDbContext<ReportingDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Reporting")));
```

## 読み取り専用 context の例

```csharp
public sealed class ReportingDbContext(DbContextOptions<ReportingDbContext> options)
    : DbContext(options)
{
    public DbSet<ProductSalesSummary> ProductSalesSummaries => Set<ProductSalesSummary>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ProductSalesSummary>()
            .HasNoKey()
            .ToView("vw_ProductSalesSummary");
    }
}
```

`SalesDbContext` は更新を含む業務処理、`ReportingDbContext` は集計や一覧表示に分けています。`ProductSalesSummary` は key を持たない view として扱い、更新対象にしていません。読み取り専用 context を分けると、`Include` の多用や巨大な entity graph を避けやすくなります。

## 実務での使い方

最初から複数 DbContext にする必要はありません。1つの DbContext が大きくなり、責務や migration の衝突、query 性能、権限境界が問題になったときに検討します。read / write 分離を導入する場合は、整合性、同期遅延、障害時の再実行を設計に含めます。

## 関連リンク

- [DbContext と Entity](04_DbContextとEntity.md)
- [Transaction](06_Transaction.md)
- [EF Core パフォーマンス診断](15_EFCoreパフォーマンス診断.md)
- [DbContext Lifetime, Configuration, and Initialization](https://learn.microsoft.com/ef/core/dbcontext-configuration/)
