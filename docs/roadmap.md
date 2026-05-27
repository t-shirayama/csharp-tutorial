# ROADMAP

C# / .NET を実務で使える状態に近づくための学習ロードマップです。

## Phase 1: 入門

目標: C# の基本構文を読み書きし、コンソールアプリを作れる。

- .NET SDK を入れる
- VS Code と C# Dev Kit を設定する
- `dotnet new`, `dotnet run`, `dotnet build` を使う
- Git repository を取得し、`dotnet restore`, `dotnet build`, `dotnet test` を確認する
- NuGet package source と SDK version の環境差分を切り分ける
- VS Code で breakpoint を置き、debug 実行できる
- 変数、型、条件分岐、繰り返し、メソッドを理解する
- `Program.cs` と top-level statements を読む
- 文字列操作、型変換、日付と時刻、`using` による resource 解放を理解する
- 入力、検証、計算、出力を組み合わせた小さなコンソールアプリを書ける

実践課題:

- コンソール電卓
- 数当てゲーム
- テキストファイルを読む小ツール

## Phase 2: 実務基礎

目標: 小さな業務ロジックをクラスに分け、コレクションや LINQ を使って処理できる。

- class, record, interface を使う
- List, Dictionary, IEnumerable を使う
- LINQ の `Where`, `Select`, `GroupBy`, `Any`, `FirstOrDefault` を使う
- `OrderBy`, `ThenBy`, `Skip`, `Take` を使い、一覧の並び替えと page 化を実装できる
- `FirstOrDefault`, `SingleOrDefault` などの取得系 LINQ を、0件や重複時の扱いに合わせて選べる
- collection を公開するときに `List<T>`, `IReadOnlyList<T>`, `IEnumerable<T>`, immutable collection を使い分ける
- 例外処理と入力検証を理解する
- JSON とファイル入出力を扱う
- `StringBuilder` と `TimeSpan` を用途に応じて使える
- デバッグ、スコープ、LINQ の materialize を意識して小さな不具合を切り分ける

実践課題:

- TODO CLI
- 家計簿集計ツール
- CSV 読み込みと集計

## Phase 3: チーム開発準備

目標: テスト、DI、ログ、設計原則を使い、保守しやすいコードを書ける。

- xUnit でユニットテストを書く
- test project を solution に分け、`dotnet test` で検証できる
- モック、スタブ、Testcontainers、カバレッジを用途に応じて使える
- 境界値、例外、非同期、キャンセル、テストデータ管理を含む実務的なテストを書ける
- flaky test を分類し、品質ゲートと PR checklist で再発を防げる
- DI の基本を理解する
- logging の使いどころを判断する
- DI lifetime、Options、構造化ログ、グローバル例外処理を ASP.NET Core の実装に落とし込む
- SOLID 原則をコードレビュー観点として使う
- Controller、Application Service、Domain、Repository の責務分担を判断する
- DTO、Request / Response、Domain Model、Entity の使い分けを説明できる
- 設計レビューで責務、依存方向、例外、ログ、設定、テスト容易性を確認できる
- 非同期処理と CancellationToken を扱う
- `ValueTask` や `IProgress<T>` を見たときに、通常の `Task` や進捗通知との違いを説明できる

実践課題:

- テスト付き TODO サービス
- 外部 API 呼び出しを含む小アプリ
- ログと設定ファイルを使う CLI
- DI、Options、ILogger、ProblemDetails を使う TODO API
- GitHub Actions で `dotnet test` を実行するサンプル

## Phase 4: 実務応用

目標: ASP.NET Core とデータベースを使い、Web API を作って運用まで考えられる。

- Minimal API / MVC の基本を理解する
- EF Core で CRUD を実装する
- 認証認可の入口を理解する
- OpenAPI で API を確認する
- GitHub Actions と Docker の基本を使う
- EF Core の query、migration、同時実行制御を実務観点で扱う
- Change Tracker、loading strategy、SQL 診断、DB access 方式の選択を説明できる
- EF Core の性能問題を、生成 SQL、実行計画、index、projection、tracking の順に切り分けられる
- Raw SQL、Dapper 併用、DB 製品差分、複数 DbContext の判断基準を説明できる
- validation、認証方式、CORS、rate limiting、HTTP caching を API 設計の判断材料にできる
- API versioning、外部 API 連携、secret 管理、デプロイ前確認を説明できる
- CI/CD や container のデプロイ失敗を、build、test、image、起動、health check に分けて調査できる
- CRUD API の request DTO、response DTO、service、status code を一連の実装として組み立てられる
- `ProblemDetails`、OpenAPI metadata、pagination、Web API integration test を実務の確認観点として使える

実践課題:

- TODO Web API
- 認証付きメモ API
- DB マイグレーション付き CRUD アプリ
- PR 提出チェックリスト付きの実務ミニ案件

## Phase 5: 高度な C# とランタイム理解

目標: C# 言語仕様、CLR、メモリ、低レベル並行処理を理解し、性能問題やライブラリ設計の判断材料にできる。

- struct、enum、delegate、event、operator overload を説明できる
- generic constraints、variance、attribute、reflection を使い分ける
- `class`、`record`、`record struct`、`struct`、`enum` の選び方を説明できる
- `Result<T>` のような generic 型で成功と失敗を表す設計を読める
- attributes と reflection を使う場面、避ける場面、AOT / trimming 上の注意を説明できる
- `ref` / `out` / `in` と `Nullable<T>` を既存 API の読解で説明できる
- GC、IDisposable、finalization、boxing の注意点を説明できる
- Stream、encoding、binary I/O、Span、Memory、Pipelines の入口を理解する
- Thread、ThreadPool、SynchronizationContext、lock、Interlocked、Semaphore の使いどころを判断する
- 必要に応じて Rx、AssemblyLoadContext、plugin model を調べられる

実践課題:

- [18章アウトライン対応表](99_参考資料/08_18章アウトライン対応表.md) を使って、未対応章の学習優先度を決める
- [13_ランタイムと高度なCSharp](13_ランタイムと高度なCSharp/README.md) を読み、CLR と GC の入口を説明する
- 大きなファイルを stream で処理し、メモリ使用量を意識した実装にする
- delegate / event を使った小さな通知サンプルを作る
- `IDisposable` が必要な型と不要な型を分類する
