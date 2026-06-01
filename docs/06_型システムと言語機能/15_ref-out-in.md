# ref / out / in parameters

## 目的

`ref`、`out`、`in` parameter の違いと使いどころを理解します。

## 前提

- [メソッド](../01_基礎文法/05_メソッド.md) を読んでいる
- [struct](../02_オブジェクト指向/11_struct.md) を読んでいる

## 要点

- `ref` は呼び出し先で値を読み書きします。
- `out` は呼び出し先で値を設定して返します。
- `in` は大きな値型をコピーせず、読み取り専用で渡します。
- 通常の業務コードでは、戻り値や object で表す方が読みやすいことが多いです。

- 注意: `ref` による変更に気づかず、呼び出し元の値が変わる。
- 注意: `out` parameter を複数使い、戻り値の意味を読みにくくする。
- 注意: performance 理由なしに `in` を使う。

## out の例

```csharp
// この例では TryParse pattern で変換結果を out parameter へ返します。
if (int.TryParse("123", out var number))
{
    Console.WriteLine(number);
}
```

## ref の例

```csharp
// この例では呼び出し先で同じ変数の値を書き換えます。
static void Increment(ref int value)
{
    value++;
}

var count = 0;
Increment(ref count);
Console.WriteLine(count);
```

`out` は `TryParse` のように「成功したら値を返す」pattern でよく見ます。`ref` は呼び出し元の変数そのものを書き換えるため、使う場所を絞らないと流れが追いにくくなります。

## 実務での使い方

既存 API の読解では `TryParse` 系の `out` が頻出します。`ref` や `in` は performance や低レイヤー API で見ることが多く、通常の業務ロジックでは戻り値や record で表した方が分かりやすいです。

## 関連リンク

- [Method parameters](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/method-parameters)
