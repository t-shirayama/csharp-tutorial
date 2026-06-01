# 取得系 LINQ の使い分け

## 目的

`First`、`FirstOrDefault`、`Single`、`SingleOrDefault`、`ElementAtOrDefault` の違いを理解し、意図に合う取得方法を選べるようにします。

## 前提

- [LINQ の基本](04_LINQの基本.md) を読んでいる
- [null と空コレクション](07_nullと空コレクション.md) を読んでいる

## 要点

- `First` は「1件以上あるはずで、その先頭が欲しい」ときに使います。0件なら例外になるため、0件が正常にあり得る検索には向きません。
- `FirstOrDefault` は「0件なら default でよい」ときに使います。参照型では `null`、数値では `0` が返るため、見つからなかった場合と実際の値を区別できる設計が必要です。
- `Single` は「条件に合うものが必ず1件だけであるべき」ときに使います。0件でも複数件でも例外になるため、一意制約や業務ルールの確認に向いています。
- `SingleOrDefault` は「0件は許すが、複数件は異常」と表したいときに使います。ユーザー ID や商品コードなど、一意のはずの値を探す場面で使いやすいです。
- `ElementAtOrDefault` は index 指定で取り出し、範囲外なら default を返します。順序と index に意味がある list や配列では使えますが、単なる検索なら `FirstOrDefault` の方が意図が明確です。
- 実務では「見つからないことが正常か」「複数見つかったら異常か」を先に決めます。取得 API は、その業務ルールをコードに表すために選びます。
- 注意: 0件があり得る検索に `First` を使い、実行時例外にする。
- 注意: 重複してはいけない値の検索に `FirstOrDefault` を使い、重複データを見逃す。
- 注意: `FirstOrDefault` の戻り値を null チェックせずに使う。
- 注意: 数値の `FirstOrDefault` で返った `0` が、見つからなかった結果なのか実データなのか分からなくなる。
- 注意: DB query で `Single` を使うと、複数件確認のために追加の検査が入ることを意識していない。

## 使い分け早見表

| メソッド | 0件 | 複数件 | 向いている場面 |
| --- | --- | --- | --- |
| `First` | 例外 | 先頭を返す | 1件以上ある前提の先頭取得 |
| `FirstOrDefault` | default | 先頭を返す | 0件が正常な検索 |
| `Single` | 例外 | 例外 | 必ず1件だけの業務ルール確認 |
| `SingleOrDefault` | default | 例外 | 0件は許すが重複は異常 |
| `ElementAtOrDefault` | default | index の要素 | index 指定の安全な取得 |

## コード例

```csharp
var users = new[]
{
    new User(1, "sato@example.com", "Sato", true),
    new User(2, "suzuki@example.com", "Suzuki", false),
    new User(3, "tanaka@example.com", "Tanaka", true)
};

// 有効な user の先頭を取得します。0件があり得るなら null チェックします。
var firstActiveUser = users.FirstOrDefault(user => user.IsActive);
if (firstActiveUser is not null)
{
    Console.WriteLine(firstActiveUser.Name);
}

// email は一意であるべきなので、複数件あれば異常として検出します。
var targetEmail = "sato@example.com";
var userByEmail = users.SingleOrDefault(user => user.Email == targetEmail);

if (userByEmail is null)
{
    Console.WriteLine("該当する user は見つかりませんでした。");
}
else
{
    Console.WriteLine($"見つかった user: {userByEmail.Name}");
}

public record User(int Id, string Email, string Name, bool IsActive);
```

## 例外になる例

```csharp
var duplicatedUsers = new[]
{
    new User(1, "same@example.com", "Sato", true),
    new User(2, "same@example.com", "Suzuki", true)
};

// email が一意である前提を破っているため、InvalidOperationException になります。
var user = duplicatedUsers.Single(user => user.Email == "same@example.com");
```

`FirstOrDefault` の例は、0件が通常ケースとしてあり得る検索です。そのため、戻り値が `null` かどうかを確認してから使います。

`SingleOrDefault` の例は、email が一意であるという業務ルールをコードに表しています。0件なら「見つからない」、複数件なら「データがおかしい」と区別できます。

## 実務での使い方

検索 API、認証 user の取得、コード値の検索、一覧の先頭取得で頻出します。レビューでは、取得 API が業務ルールを正しく表しているかを見ます。

一意制約が DB にある場合でも、アプリ側で `SingleOrDefault` を使うと「重複は異常」という意図が伝わります。ただし、性能や query の読みやすさも考え、必要に応じて DB 制約、validation、例外処理を組み合わせます。

## 関連リンク

- [Element operations](https://learn.microsoft.com/dotnet/csharp/linq/standard-query-operators/element-operations)
- [Enumerable.FirstOrDefault Method](https://learn.microsoft.com/dotnet/api/system.linq.enumerable.firstordefault)
- [Enumerable.SingleOrDefault Method](https://learn.microsoft.com/dotnet/api/system.linq.enumerable.singleordefault)
