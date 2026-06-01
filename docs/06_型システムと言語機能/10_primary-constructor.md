# primary constructor

## 目的

primary constructor を使い、コンストラクタ引数を簡潔に表現する方法を理解します。

## 前提

- [コンストラクタ](../02_オブジェクト指向/03_コンストラクタ.md) を読んでいる
- [DI コンテナの実装](../07_設計と実務パターン/09_DIコンテナの実装.md) を読んでいる

## 要点

- primary constructor は型宣言に constructor parameter を書けます。
- 小さな service や DTO で boilerplate を減らせます。
- 複雑な初期化や validation がある場合は通常の constructor の方が読みやすいことがあります。

- 注意: 何でも primary constructor にして初期化処理が読みにくくなる。
- 注意: 引数を field として保持する意図が曖昧になる。
- 注意: チーム内で記法が混在し、レビュー負担が増える。

## コード例

```csharp
// primary constructor で DI から受け取る依存を型宣言にまとめます。
public class TodoService(ITodoRepository repository, ILogger<TodoService> logger)
{
    public async Task CompleteAsync(int id)
    {
        // 構造化ログとして TodoId を名前付きプロパティで出します。
        logger.LogInformation("Completing todo. TodoId={TodoId}", id);

        // 実際の永続化処理は repository に委譲します。
        await repository.CompleteAsync(id);
    }
}
```

`TodoService(...)` の括弧内が primary constructor です。従来の constructor と同じく、DI コンテナーから `ITodoRepository` と `ILogger<TodoService>` を受け取ります。

処理の中では、ログ出力と repository 呼び出しだけを行っています。初期化処理や validation が増えてきたら、通常の constructor に戻した方が読みやすい場合があります。

## 実務での使い方

DI で依存を受け取る service を簡潔にできます。チームで採用方針を決め、読みやすさが落ちる場合は従来の constructor にします。

## 関連リンク

- [Instance constructors](https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/instance-constructors)
