# null 関連エラー

## 症状

`NullReferenceException` や nullable warning が発生します。

## 主な原因

- null の可能性がある値をチェックせず使っている。
- `string?` と `string` の意味を混同している。
- 外部 API や DB から期待しない null が返っている。

## 対処

```csharp
// この例では「null 関連エラー」の要点を最小のコードで確認します。
if (value is null)
{
    return;
}

Console.WriteLine(value.Length);
```

## コードの読み方

このコード例は「null 関連エラー」の基本形を確認するためのものです。上から順に、値や object を用意し、C# の構文や .NET API を使い、最後に結果を確認します。まず入力、処理、出力の 3 つに分けて読むと、初学者でも流れを追いやすくなります。

## 判断

- null を許す値なら `?` を付ける。
- null を許さない値ならコンストラクタや validation で守る。
- 一覧は null ではなく空コレクションを返す。

## 関連

- [nullable reference types](../06_型システムと言語機能/01_nullable-reference-types.md)
- [null と空コレクション](../03_コレクションとLINQ/07_nullと空コレクション.md)
