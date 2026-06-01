# required と init

## 目的

作成時に必要な値を明示し、作成後の不要な変更を防ぐ型を設計します。

## 前提

- [nullable reference types](01_nullable-reference-types.md) を読んでいる
- [プロパティとメソッド](../02_オブジェクト指向/02_プロパティとメソッド.md) を読んでいる

## 要点

- `required` は object 初期化時に設定が必要な property を示します。設定漏れを compiler が検出しやすくなりますが、空文字や範囲外の値までは防ぎません。
- `init` は初期化時だけ設定可能な setter です。DTO や設定 class のように、作成後は値を書き換えたくない型で役立ちます。
- runtime validation の代わりではなく、コンパイル時の補助です。外部 API request、設定ファイル、DB など外から来る値は validation と組み合わせます。
- constructor は不正な値を防ぎたい domain model に向いています。`required` / `init` は object initializer と相性がよい DTO や設定 class に向いています。
- `required`、`init`、nullable reference types は組み合わせて使います。必須か任意か、作成後に変更してよいか、不正値をどこで止めるかを分けて考えます。

- 注意: `required` が null や空文字を完全に防ぐと思う。
- 注意: 変更が必要な property まで `init` にする。
- 注意: constructor validation と object initializer の責務を混同する。

## コード例

```csharp
// この例では「required と init」の要点を最小のコードで確認します。
public class UserProfile
{
    // required により、object 初期化時に設定漏れがあると警告されます。
    public required string DisplayName { get; init; }

    // string? は未入力を許す項目です。init なので作成後の変更はできません。
    public string? Bio { get; init; }
}

var profile = new UserProfile
{
    // DisplayName は required なので、ここで必ず指定します。
    DisplayName = "Taro"
};
```

`DisplayName` は必須項目なので `required` を付けています。`Bio` は任意入力なので `string?` にしています。どちらも `init` のため、object initializer で作成した後に値を書き換えにくい型になります。

ただし `required` は「設定したか」を compiler に知らせる機能であり、空文字や不正値までは防ぎません。外部入力では validation と組み合わせます。

## 実務での使い方

DTO、設定 class、読み取りモデルで使いやすい機能です。外部入力の検証は validation と組み合わせます。

型ごとの選び方は [型設計の選び方](17_型設計の選び方.md) で扱います。

## 関連リンク

- [required modifier](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/required)
- [init keyword](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/init)
