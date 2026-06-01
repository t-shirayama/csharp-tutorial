# コンソール電卓

## 目的

C# の基礎文法を使って、入力、条件分岐、数値変換、出力を含む小さなコンソールアプリを作ります。

## 作るもの

2つの数値と演算子を入力し、計算結果を表示するコンソール電卓です。

## 前提

- .NET SDK が使える
- `dotnet new console` と `dotnet run` が使える
- `Console.ReadLine` と `Console.WriteLine` の役割を知っている

## 要点

- 入力、計算、出力の 3 つに分けて読むと、処理の流れを追いやすくなります。
- 注意: 数値ではない文字を入力すると `decimal.Parse` で例外になります。
- 注意: 0 で割ると例外になります。
- 注意: 実務では `Parse` より `TryParse` を使い、入力エラーを扱うことが多いです。

## 手順

```powershell
dotnet new console -n ConsoleCalculator
Set-Location ConsoleCalculator
dotnet run
```

`Program.cs` を次のように書き換えます。

```csharp
// この例では「コンソール電卓」の要点を最小のコードで確認します。
Console.Write("1つ目の数値: ");
var leftText = Console.ReadLine();

Console.Write("演算子 (+, -, *, /): ");
var operation = Console.ReadLine();

Console.Write("2つ目の数値: ");
var rightText = Console.ReadLine();

var left = decimal.Parse(leftText ?? "0");
var right = decimal.Parse(rightText ?? "0");

var result = operation switch
{
    "+" => left + right,
    "-" => left - right,
    "*" => left * right,
    "/" => left / right,
    _ => throw new InvalidOperationException("未対応の演算子です。")
};

Console.WriteLine($"結果: {result}");
```

コード例は、上から順に入力、数値変換、演算子による分岐、結果出力を行います。まず `Console.ReadLine` で文字列として受け取り、`decimal.Parse` で計算できる値に変換し、`switch` 式で演算子ごとの処理を選びます。

## 確認コマンド

```powershell
dotnet run
```

## 完了条件

- `1 + 2` の結果として `3` が表示される。
- `10 / 2` の結果として `5` が表示される。
- 未対応の演算子を入れたときの挙動を説明できる。
