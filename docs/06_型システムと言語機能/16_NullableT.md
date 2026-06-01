# Nullable&lt;T&gt;

## 目的

値型に null を許す `Nullable<T>` と、nullable reference types との違いを理解します。

## 前提

- [nullable reference types](01_nullable-reference-types.md) を読んでいる
- [変数と型](../01_基礎文法/02_変数と型.md) を読んでいる

## 要点

- `int?` は `Nullable<int>` の短縮形です。
- `HasValue` で値があるか、`Value` で中身を取り出します。
- nullable reference types は compile-time の警告で、`Nullable<T>` は値型を包む struct です。

- 注意: `Value` を無条件に呼び、例外にする。
- 注意: `0`、空文字、null の意味を混同する。
- 注意: nullable reference types と `Nullable<T>` を同じ仕組みだと思う。

## コード例

```csharp
// この例では int? が値を持つか確認してから取り出します。
int? maybeAge = 30;

if (maybeAge.HasValue)
{
    Console.WriteLine(maybeAge.Value);
}
```

## null 合体の例

```csharp
// この例では null のときに既定値を使います。
int? retryCount = null;
var actualRetryCount = retryCount ?? 3;

Console.WriteLine(actualRetryCount);
```

`int?` は値がない状態を表せる値型です。`Value` は値がないと例外になるため、`HasValue`、pattern matching、`??` などで安全に扱います。

## 実務での使い方

DB の nullable column、任意入力の数値、外部 API の未設定値で使います。`0` と `null` の意味は違うため、業務上どちらを使うべきかを明確にします。

## 関連リンク

- [Nullable value types](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/nullable-value-types)
