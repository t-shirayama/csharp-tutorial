# IHostedService とバックグラウンド処理

## 目的

ASP.NET Core や Worker Service でバックグラウンド処理を安全に実装する入口を理解します。

## 前提

- [DI コンテナの実装](09_DIコンテナの実装.md) を読んでいる
- [CancellationToken](../05_非同期と並行処理/03_CancellationToken.md) を読んでいる
- [ログ設計と構造化ログ](04_ログ設計.md) を読んでいる

## 要点

- `BackgroundService` は `IHostedService` の実装を簡単にする基底クラスです。
- 停止要求は `CancellationToken` で受け取ります。
- Scoped サービスを使う場合は `IServiceScopeFactory` で scope を作ります。
- 失敗時の再試行、ログ、停止方針を設計します。

## 登録例

```csharp
// この例では「IHostedService とバックグラウンド処理」の要点を最小のコードで確認します。
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHostedService<QueuedWorker>();

var app = builder.Build();
app.Run();
```

## BackgroundService の例

```csharp
// この例では「IHostedService とバックグラウンド処理」の要点を最小のコードで確認します。
public class QueuedWorker : BackgroundService
{
    private readonly ILogger<QueuedWorker> logger;

    public QueuedWorker(ILogger<QueuedWorker> logger)
    {
        this.logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            logger.LogInformation("Worker running at {Time}", DateTimeOffset.UtcNow);
            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
        }
    }
}
```

## Scoped サービスを使う例

```csharp
// この例では「IHostedService とバックグラウンド処理」の要点を最小のコードで確認します。
public class ScopedWorker : BackgroundService
{
    private readonly IServiceScopeFactory scopeFactory;
    private readonly ILogger<ScopedWorker> logger;

    public ScopedWorker(IServiceScopeFactory scopeFactory, ILogger<ScopedWorker> logger)
    {
        this.scopeFactory = scopeFactory;
        this.logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = scopeFactory.CreateScope();
            var processor = scope.ServiceProvider.GetRequiredService<IJobProcessor>();

            await processor.ProcessAsync(stoppingToken);
            logger.LogInformation("Job processed.");

            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
    }
}
```

## コードの読み方

このコード例は「IHostedService とバックグラウンド処理」の基本形を確認するためのものです。上から順に、値や object を用意し、C# の構文や .NET API を使い、最後に結果を確認します。まず入力、処理、出力の 3 つに分けて読むと、初学者でも流れを追いやすくなります。

## 実務での使い方

定期バッチ、キュー処理、外部サービス同期、期限切れデータの整理などで使います。長時間処理はアプリ停止時にキャンセルできるようにし、処理中断時の整合性も設計します。

## よくあるミス

- `CancellationToken` を無視して停止できない処理を書く。
- `BackgroundService` に Scoped サービスを直接注入する。
- 例外でバックグラウンド処理が止まったままになる。
- 同時実行、再試行、重複実行の方針がない。

## レビュー観点

- 停止要求を下位処理へ渡しているか。
- Scoped サービスの scope を正しく作っているか。
- 失敗時のログ、再試行、通知、停止方針があるか。
- 多重起動や重複実行に耐えられるか。

## 関連リンク

- [Worker Services in .NET](https://learn.microsoft.com/dotnet/core/extensions/workers)
- [Background tasks with hosted services in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/host/hosted-services)
