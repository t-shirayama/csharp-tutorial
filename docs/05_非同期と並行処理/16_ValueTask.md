# ValueTask

## 目的

`Task` と `ValueTask` の違いと、`ValueTask` を使うべき場面を理解します。

## 前提

- [Task の基本](01_Taskの基本.md) を読んでいる
- [async / await](02_async-await.md) を読んでいる

## 要点

- `ValueTask<T>` は結果が同期的に返ることが多い high throughput API で allocation を抑えるための選択肢です。
- 通常の application code では `Task` を優先します。
- `ValueTask` は扱いを誤ると複雑になるため、public API で使う前に理由を明確にします。
- 注意: 何となく性能がよさそうという理由で全 API を `ValueTask` にする。
- 注意: `ValueTask` を複数回 await できると思う。
- 注意: 計測せずに最適化する。

## コード例

```csharp
// この例では cache hit 時に同期的に値を返します。
public ValueTask<string> GetNameAsync(int id)
{
    if (cache.TryGetValue(id, out var name))
    {
        return ValueTask.FromResult(name);
    }

    return new ValueTask<string>(LoadNameAsync(id));
}
```

cache に値がある場合は、`Task` object を作らず `ValueTask.FromResult` で返します。cache miss の場合は通常の非同期処理 `LoadNameAsync` に委譲します。

## 実務での使い方

framework、serializer、buffer、cache など、非常に高頻度で呼ばれる API で検討します。Web API の controller や service の通常処理では、読みやすさと一貫性のため `Task` で十分なことがほとんどです。

## 関連リンク

- [ValueTask Struct](https://learn.microsoft.com/dotnet/api/system.threading.tasks.valuetask)
