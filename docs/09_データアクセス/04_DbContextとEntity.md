# DbContext と Entity

## 目的

EF Core の中心である `DbContext` と Entity の役割を理解します。

## 要点

- Entity は DB の行に対応するオブジェクトです。
- DbContext は Entity の取得、変更追跡、保存を担当します。
- `SaveChangesAsync` で変更を DB に反映します。

- 注意: DbContext を長期間保持する。
- 注意: Entity を API レスポンスとしてそのまま公開する。
- 注意: 変更追跡を理解せず、意図しない UPDATE を起こす。

## コード例

```csharp
// この例では「DbContext と Entity」の要点を最小のコードで確認します。
public class AppDbContext : DbContext
{
    public DbSet<Product> Products => Set<Product>();
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}
```

## 実務での使い方

DbContext は短い単位で使い、リクエストごとの Scoped が基本です。Entity にどこまで業務ロジックを持たせるかはアーキテクチャ方針によります。


## 関連リンク

- [DbContext](https://learn.microsoft.com/ef/core/dbcontext-configuration/)
