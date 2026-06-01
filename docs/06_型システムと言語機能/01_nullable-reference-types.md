# nullable reference types

## 目的

null になる可能性を型で表し、NullReferenceException を減らす考え方を理解します。

## 要点

- `string` は null でない前提、`string?` は null の可能性ありを表します。`?` は単なる警告回避ではなく、呼び出し側へ「値がない場合がある」という契約を伝えるための表現です。
- null かもしれない値は、チェックしてから使います。`if (name is not null)`、pattern matching、null 合体演算子 `??` などで、値がある場合とない場合の処理を明確に分けます。
- 警告を無視せず、設計上 null を許すかを判断します。必須項目なら constructor や validation で守り、任意項目なら `?` を付けて呼び出し側に扱いを強制します。
- `!` null 許容抑制演算子は compiler に「ここは null ではない」と伝えるだけで、実行時の null を防ぎません。多用すると nullable reference types の価値が薄れるため、根拠がある場面に絞ります。
- 空文字 `""` と null は同じ意味ではありません。未入力、未設定、該当なし、空の値を業務上どう区別するかを決めてから型や validation に反映します。
- 外部 API、DB、設定ファイルから来る値は、自分のコードより信頼度が低い入力です。境界で null や欠損を検証し、内部の業務ロジックへはできるだけ null でない型として渡します。

## コード例

```csharp
// string? は「null の可能性がある文字列」を表します。
string? name = FindName();

// null でないことを確認したブロック内では、string として安全に扱えます。
if (name is not null)
{
    Console.WriteLine(name.Length);
}

// 見つからない場合は null を返す、という契約を戻り値の ? で表します。
static string? FindName() => null;
```

`FindName` の戻り値は `string?` なので、呼び出し側は null の可能性を考える必要があります。`if (name is not null)` の中では compiler が null チェック済みと判断するため、`name.Length` に nullable 警告が出ません。

この例で重要なのは「null を返すこと」自体ではなく、null を返す可能性を型に表して、呼び出し側で明示的に扱うことです。

## 実務での使い方

DTO、DB 取得結果、外部 API レスポンスでは null の可能性を明示します。null を許さない値はコンストラクタや validation で守ります。

## 関連リンク

- [Nullable reference types](https://learn.microsoft.com/dotnet/csharp/nullable-references)
