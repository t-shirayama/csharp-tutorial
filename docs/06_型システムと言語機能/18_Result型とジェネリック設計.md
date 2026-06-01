# Result 型とジェネリック設計

## 目的

`Result<T>` や `ApiResponse<T>` のような generic 型を読み、成功と失敗を型で表す設計の入口を理解します。

## 前提

- [generics](02_generics.md) を読んでいる
- [ジェネリック制約](11_ジェネリック制約.md) を読んでいる
- [例外設計](../07_設計と実務パターン/03_例外設計.md) を読んでいる

## 要点

- generic 型は、値の型だけを変えて同じ考え方を再利用するために使います。`Result<Order>`、`Result<User>`、`Result<Product>` のように、成功値の型を変えながら同じ失敗表現を使えます。
- `Result<T>` は、処理が成功したか失敗したかを戻り値として表す型です。入力エラーや業務ルール違反のような想定できる失敗を、例外ではなく通常の制御フローで扱いたい場合に候補になります。
- 例外をすべて `Result<T>` に置き換える必要はありません。DB 障害、programming error、外部サービスの想定外失敗などは例外として扱う方が自然なこともあります。
- `ApiResponse<T>` のような型は、API の戻り値形式を統一できます。ただし、HTTP status や ProblemDetails と役割が重複しないようにします。
- generic 型は便利ですが、型 parameter が増えすぎると読みにくくなります。`Result<TValue, TError>` のような設計は表現力が上がる一方で、学習コストも上がります。
- 実務では、成功値、失敗理由、呼び出し側の扱いやすさを考えて設計します。型で意図を表せると、呼び出し側が null や例外に頼りすぎずに済みます。

- 注意: 想定外の障害まで全部 `Result<T>` に詰め込み、ログや例外処理が曖昧になる。
- 注意: `Result<T>` の `Value` を成功確認せずに使う。
- 注意: error message だけで分岐し、呼び出し側が文字列比較に依存する。
- 注意: `ApiResponse<T>` と HTTP status / ProblemDetails の役割が重複する。
- 注意: generic 化しすぎて、具体的な業務意図が読めなくなる。

## Result 型の例

```csharp
public class Result<T>
{
    private Result(bool isSuccess, T? value, string? errorMessage)
    {
        IsSuccess = isSuccess;
        Value = value;
        ErrorMessage = errorMessage;
    }

    public bool IsSuccess { get; }
    public T? Value { get; }
    public string? ErrorMessage { get; }

    public static Result<T> Success(T value) => new(true, value, null);

    public static Result<T> Failure(string errorMessage) => new(false, default, errorMessage);
}
```

## 使う側の例

```csharp
public Result<Order> CreateOrder(string customerName)
{
    if (string.IsNullOrWhiteSpace(customerName))
    {
        return Result<Order>.Failure("顧客名は必須です。");
    }

    var order = new Order(customerName);
    return Result<Order>.Success(order);
}

var result = CreateOrder("Sato");
if (!result.IsSuccess)
{
    Console.WriteLine(result.ErrorMessage);
    return;
}

Console.WriteLine(result.Value!.CustomerName);

public record Order(string CustomerName);
```

## ApiResponse の例

```csharp
public record ApiResponse<T>(T? Data, string? ErrorCode, string? Message)
{
    public static ApiResponse<T> Ok(T data) => new(data, null, null);

    public static ApiResponse<T> Error(string errorCode, string message) => new(default, errorCode, message);
}

var response = ApiResponse<string>.Ok("created");
Console.WriteLine(response.Data);
```

`Result<T>` は成功時に `T` の値を持ち、失敗時に error message を持ちます。呼び出し側は `IsSuccess` を見て、成功値を使うか失敗を扱うかを分けます。

この例では単純にするため `Value!` を使っていますが、実務では成功時だけ値を安全に取り出せる API にする、失敗理由を enum や専用 error 型にするなど、誤用しにくい設計を検討します。

## 実務での使い方

validation error、domain error、検索で見つからないケースなど、呼び出し側が通常の分岐として扱いたい失敗に向いています。Web API では、Application Service が `Result<T>` を返し、endpoint や filter が HTTP response に変換する構成がよくあります。

一方で、インフラ障害やプログラムの不整合は例外として扱う方が自然です。`Result<T>` は例外設計の代替ではなく、想定できる失敗を型で表すための選択肢です。

## 関連リンク

- [Generics](https://learn.microsoft.com/dotnet/csharp/fundamentals/types/generics)
- [Best practices for exceptions](https://learn.microsoft.com/dotnet/standard/exceptions/best-practices-for-exceptions)
