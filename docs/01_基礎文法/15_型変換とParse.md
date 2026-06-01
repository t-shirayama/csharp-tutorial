# 型変換と Parse

## 目的

文字列や数値を別の型へ変換するときの基本と、変換失敗を安全に扱う方法を理解します。

## 前提

- [変数と型](02_変数と型.md) を読んでいる
- [例外処理の入口](07_例外処理の入口.md) を読んでいる
- [文字列操作](14_文字列操作.md) を読んでいる

## 要点

- 外部から入ってくる値は、多くの場合 `string` として扱います。コンソール入力、CSV、環境変数、query string、JSON の一部などは、必要な型へ変換してから使います。
- `Parse` は変換できないと例外を投げます。ユーザー入力のように失敗が普通に起きる場面では、`TryParse` を使うと分岐として扱えます。
- `int`、`decimal`、`DateTime` など、型ごとに `TryParse` があります。金額には `decimal`、件数には `int`、日時には `DateTime` や `DateTimeOffset` を使うなど、値の意味に合わせて変換先を選びます。
- 数値型同士の変換には、暗黙的変換と明示的変換があります。小さい範囲から大きい範囲への変換は安全ですが、`decimal` から `int` のように情報が失われる変換では明示的な cast や丸めが必要です。
- 小数を整数にするときは、切り捨て、四捨五入、切り上げのどれが仕様かを確認します。なんとなく cast すると、金額や数量で不具合になります。
- 数値や日時の文字列表現は文化圏の影響を受けます。実務では入力形式を決める、画面表示用と保存用を分ける、API では ISO 8601 形式を使う、といった設計が必要です。
- 注意: ユーザー入力に `int.Parse` を使い、入力ミスでアプリが終了する。
- 注意: `TryParse` が `false` のときにも `out` 変数をそのまま使う。
- 注意: `decimal` から `int` への cast を四捨五入だと思い込む。
- 注意: 変換できることと、業務上有効な値であることを同じチェックにしてしまう。

## int.TryParse

```csharp
Console.Write("数量を入力してください: ");
var input = Console.ReadLine();

// ユーザー入力は失敗があり得るので、Parse ではなく TryParse で判定します。
if (!int.TryParse(input, out var quantity))
{
    Console.WriteLine("数量は整数で入力してください。");
    return;
}

if (quantity <= 0)
{
    Console.WriteLine("数量は1以上にしてください。");
    return;
}

Console.WriteLine($"数量: {quantity}");
```

## decimal.TryParse

```csharp
Console.Write("単価を入力してください: ");
var input = Console.ReadLine();

if (!decimal.TryParse(input, out var unitPrice))
{
    Console.WriteLine("単価は数値で入力してください。");
    return;
}

if (unitPrice < 0)
{
    Console.WriteLine("単価は0以上にしてください。");
    return;
}

Console.WriteLine($"単価: {unitPrice}円");
```

## 明示的変換と丸め

```csharp
decimal average = 12.6m;

// cast は小数部を切り捨てます。四捨五入ではありません。
var truncated = (int)average;

// 四捨五入が仕様なら Math.Round を使い、意図を明示します。
var rounded = (int)Math.Round(average, MidpointRounding.AwayFromZero);

Console.WriteLine(truncated); // 12
Console.WriteLine(rounded);   // 13
```

`TryParse` の例は、入力、変換、範囲チェック、利用の順に読めます。変換できたかどうかと、業務的に有効な値かどうかは別のチェックです。`"abc"` は整数に変換できない入力で、`0` は変換できても数量として不正、というように分けて考えます。

## 実務での使い方

画面、CSV、command line、設定値から受け取った値は、信頼できる型に変換してから業務処理へ渡します。変換と validation を入口で済ませると、後続のメソッドは `int quantity` や `decimal amount` として扱えるため、コードが読みやすくなります。

## 関連リンク

- [Int32.TryParse Method](https://learn.microsoft.com/dotnet/api/system.int32.tryparse)
- [Decimal.TryParse Method](https://learn.microsoft.com/dotnet/api/system.decimal.tryparse)
- [Casting and type conversions](https://learn.microsoft.com/dotnet/csharp/programming-guide/types/casting-and-type-conversions)
