# enum

## 目的

決まった選択肢を表す `enum` の基本と、実務での扱い方を理解します。

## 前提

- [class と object](01_classとobject.md) を読んでいる
- [System.Text.Json と JSON 契約](../04_標準ライブラリ/04_SystemTextJson.md) を読んでいる

## 要点

- `enum` は名前付きの定数セットです。
- 状態、種別、区分など、選択肢が限られる値に使います。
- DB や JSON で数値として保存・公開すると、意味が伝わりにくくなることがあります。

## コード例

```csharp
// この例では「enum」の要点を最小のコードで確認します。
public enum OrderStatus
{
    Draft = 0,
    Submitted = 1,
    Paid = 2,
    Cancelled = 3
}

OrderStatus status = OrderStatus.Submitted;

if (status == OrderStatus.Submitted)
{
    Console.WriteLine("注文は送信済みです。");
}
```

## コードの読み方

`OrderStatus` は注文の状態を名前で表します。`1` のような数値だけを使うより、コードの意図が読みやすくなります。`Draft = 0` のように明示しておくと、既定値が何を意味するかも確認しやすくなります。

## 実務での使い方

画面表示、API、DB と接続する値では、enum の追加や名称変更が互換性に影響します。公開 API では文字列に変換するか、別途コード値の仕様を明記します。

## よくあるミス

- enum の数値を外部契約にして、後から変更できなくなる。
- `0` の値を定義せず、既定値が意味不明になる。
- 状態遷移のルールまで enum だけで表そうとする。

## 関連リンク

- [Enumeration types](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/enum)
- [How to serialize and deserialize enums](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/customize-properties#enums-as-strings)
