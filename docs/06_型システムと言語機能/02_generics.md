# generics

## 目的

型を引数として扱う generics を理解し、`List<T>` や自作汎用型を読めるようにします。

## 要点

- generics は型安全な再利用を可能にします。同じ処理を `string` 用、`int` 用、`Order` 用に書き分ける代わりに、型だけを呼び出し側から渡せます。
- `T` は型パラメーターの慣習名です。意味が明確な場合は `TValue`、`TError`、`TEntity` のように名前を付けると、generic 型の意図が読みやすくなります。
- 制約を付けると、使える型を限定できます。`where T : IComparable<T>` のように書くと、method 内で比較できる前提を compiler に伝えられます。
- 実務では `List<T>`、`IEnumerable<T>`、`Task<T>`、`Result<T>`、`ApiResponse<T>` などで頻出します。型 parameter が何を表すかを読むと、API の契約が分かりやすくなります。
- 汎用化は便利ですが、目的がない generic は読みにくくなります。1種類の型にしか使わない処理や、業務名が重要な処理では具体型の方が分かりやすいことがあります。

## コード例

```csharp
// この例では「generics」の要点を最小のコードで確認します。
static T FirstOrThrow<T>(IEnumerable<T> items)
{
    foreach (var item in items)
    {
        return item;
    }

    throw new InvalidOperationException("要素がありません。");
}
```

## 実務で見る generic 型の例

```csharp
public record ApiResponse<T>(T? Data, string? ErrorCode, string? Message);

var response = new ApiResponse<ProductResponse>(
    new ProductResponse("P-001", "Keyboard"),
    ErrorCode: null,
    Message: null);

Console.WriteLine(response.Data?.Name);

public record ProductResponse(string Code, string Name);
```


## 実務での使い方

Repository、Result 型、共通レスポンス、コレクション、変換処理などで登場します。使いすぎると読みにくくなるため、具体型で十分な場所は具体型にします。

成功と失敗を generic 型で表す設計は [Result 型とジェネリック設計](18_Result型とジェネリック設計.md) で扱います。

## 関連リンク

- [Generics](https://learn.microsoft.com/dotnet/csharp/fundamentals/types/generics)
