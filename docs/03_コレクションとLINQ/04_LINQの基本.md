# LINQ の基本

## 目的

コレクションから必要な値を抽出、変換、判定する LINQ の基本を理解します。

## 要点

- `Where` は条件に合う要素を抽出します。元のコレクションを書き換えるのではなく、条件を満たす要素だけを順に取り出す処理として考えます。
- `Select` は要素を別の形に変換します。Entity から DTO、数値から表示用文字列、複数プロパティから匿名型など、次の処理に必要な形へ変えるときに使います。
- `Any`, `All`, `FirstOrDefault` は判定や取得に使います。存在確認だけなら `Count() > 0` より `Any()` の方が意図が明確で、不要な全件走査を避けやすくなります。
- LINQ は読みやすい反面、長くつなげすぎると条件や変換の意図が追いにくくなります。業務上の意味がある条件は変数名やメソッド名に切り出すと、レビューしやすくなります。
- `IEnumerable<T>` に対する LINQ は遅延評価されるものが多く、`foreach` や `ToList()` などで列挙されるまで実行されません。DB クエリや外部入力を扱うときは、いつ実行されるかを意識します。
- `FirstOrDefault` は値が見つからない場合に default 値を返します。参照型なら `null`、数値なら `0` になるため、「本当に見つかった値」なのか「見つからなかった結果」なのかを区別できる設計にします。

## コード例

```csharp
// この例では「LINQ の基本」の要点を最小のコードで確認します。
var numbers = new[] { 1, 2, 3, 4, 5 };

var evenNumbers = numbers.Where(number => number % 2 == 0);
var labels = evenNumbers.Select(number => $"No.{number}");

foreach (var label in labels)
{
    Console.WriteLine(label);
}
```

## よく使うメソッド

| メソッド | 用途 |
| --- | --- |
| `Where` | 抽出 |
| `Select` | 変換 |
| `Any` | 1件でもあるか |
| `All` | 全件が条件を満たすか |
| `FirstOrDefault` | 最初の1件を取得 |
| `ToList` | List に確定 |

## 実務での使い方

一覧から条件に合うデータを取り出す、表示用 DTO に変換する、入力値の妥当性を判定する、といった場面で頻出します。長すぎる LINQ はメソッドに分けると読みやすくなります。

## 関連リンク

- [LINQ](https://learn.microsoft.com/dotnet/csharp/linq/)
