# Testcontainers

## 目的

Docker コンテナで DB などを起動し、実物に近い統合テストを行う方法を理解します。

## 前提

- [テストプロジェクト構成](08_テストプロジェクト構成.md) を読んでいる
- Docker が使える
- DB を含むテストの必要性を説明できる

## 要点

- Testcontainers はテスト実行時に DB や外部サービスのコンテナを起動します。
- モックでは見つけにくい SQL、migration、接続設定の問題を検出できます。
- 起動時間がかかるため、unit test と integration test を分けて考えます。

## パッケージ例

```powershell
dotnet add tests/TodoApp.Tests package Testcontainers.PostgreSql
```

xUnit と連携する helper を使う場合は、xUnit の major version に合わせてパッケージを選びます。

```powershell
dotnet add tests/TodoApp.Tests package Testcontainers.XunitV3
dotnet add tests/TodoApp.Tests package Testcontainers.Xunit
```

上は xUnit v3 用、下は xUnit v2 用です。通常の fixture を自分で書く場合は、`Testcontainers.PostgreSql` だけでも始められます。

## コード例

```csharp
// この例では「Testcontainers」の要点を最小のコードで確認します。
public class DatabaseFixture : IAsyncLifetime
{
    private readonly PostgreSqlContainer postgres = new PostgreSqlBuilder()
        .WithImage("postgres:16")
        .WithDatabase("todo")
        .WithUsername("postgres")
        .WithPassword("postgres")
        .Build();

    public string ConnectionString => postgres.GetConnectionString();

    public Task InitializeAsync() => postgres.StartAsync();

    public Task DisposeAsync() => postgres.DisposeAsync().AsTask();
}
```

この例は xUnit v2 の `IAsyncLifetime` 形式です。xUnit v3 や `Testcontainers.XunitV3` を使う場合は、公式の base class や `ValueTask` ベースの lifecycle も確認します。container image は `latest` ではなく `postgres:16` のように major version を固定します。


## 実務での使い方

EF Core の migration、SQL の互換性、トランザクション、unique 制約、N+1 調査などで使います。CI で Docker が使えるか、実行時間が許容できるかを確認します。

## レビュー観点

- モックではなく実 DB が必要な理由があるか。
- テストデータは各テストで独立しているか。
- migration を含めて検証しているか。
- CI で実行可能な時間と環境か。

- 注意: unit test と同じ頻度で重い integration test をすべて実行する。
- 注意: テストデータの初期化や後片付けが曖昧。
- 注意: ローカルでは動くが CI の Docker 環境で失敗する。
- 注意: コンテナ起動失敗時のログを確認しない。
- 注意: `latest` tag を使い、ある日突然 DB image の挙動が変わる。

## 関連リンク

- [Testcontainers for .NET](https://dotnet.testcontainers.org/)
- [Testing with xUnit.net](https://dotnet.testcontainers.org/test_frameworks/xunit_net/)
- [Integration tests in ASP.NET Core](https://learn.microsoft.com/aspnet/core/test/integration-tests)
