# class と object

## 目的

C# のクラスとオブジェクトの基本を理解し、値と処理をひとまとまりにして扱えるようにします。

## 前提

- [変数と型](../01_基礎文法/02_変数と型.md) を読んでいる
- [メソッド](../01_基礎文法/05_メソッド.md) を読んでいる

## 要点

- `class` は、値と処理をまとめる設計図です。単に変数を集める箱ではなく、「この情報を持ち、この操作ができる」という責務の単位として考えます。
- `object` は、クラスから作られた実体です。同じ `User` クラスから作っても、`Name` や `Age` が異なれば別々のユーザー object として扱われます。
- クラスにはプロパティ、メソッド、コンストラクタなどを定義できます。プロパティは状態、メソッドは振る舞い、コンストラクタは正しい初期状態を作る入口として使い分けます。
- 実務では、関連する値と責務を自然にまとめるためにクラスを使います。画面表示用、DB 保存用、業務ルール用など、目的の違う情報を無理に1つのクラスへ詰め込まないことが重要です。
- クラスを作るときは「何を知っているべきか」と「何をしてよいか」を分けて考えます。何でもできる巨大なクラスは変更に弱くなるため、責務が増えたら分割を検討します。
- object は参照として扱われるため、同じ object を複数の変数から参照していると、一方の変更がもう一方にも見えます。値のコピーなのか、同じ実体を共有しているのかを意識します。
- 注意: クラスを単なる変数置き場にして、責務が曖昧になる。
- 注意: 1つのクラスに多くの役割を詰め込みすぎる。
- 注意: `new` しただけで、必要なプロパティの値を入れ忘れる。
- 注意: クラス名が抽象的すぎて、何を表すのか分かりにくい。

## 最小例

```csharp
// この例では「class と object」の要点を最小のコードで確認します。
var user = new User();
user.Name = "Sato";
user.Age = 30;

Console.WriteLine(user.Name);
Console.WriteLine(user.Age);

public class User
{
    public string Name { get; set; } = "";
    public int Age { get; set; }
}
```

`User` がクラス、`new User()` で作られた `user` がオブジェクトです。

## なぜクラスにするのか

複数の変数を別々に扱うと、値の関係が分かりにくくなります。

```csharp
// この例では「class と object」の要点を最小のコードで確認します。
var userName = "Sato";
var userAge = 30;
var userEmail = "sato@example.com";
```

クラスにまとめると、これらが同じユーザーの情報であることを表現できます。

```csharp
// この例では「class と object」の要点を最小のコードで確認します。
var user = new User
{
    Name = "Sato",
    Age = 30,
    Email = "sato@example.com"
};

public class User
{
    public string Name { get; set; } = "";
    public int Age { get; set; }
    public string Email { get; set; } = "";
}
```

## object initializer

プロパティに値を入れながらオブジェクトを作る書き方を object initializer と呼びます。

```csharp
// この例では「class と object」の要点を最小のコードで確認します。
var product = new Product
{
    Name = "Keyboard",
    Price = 12000m
};

Console.WriteLine($"{product.Name}: {product.Price}円");

public class Product
{
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}
```

## 実務での使い方

実務では、ユーザー、注文、商品、請求、設定、検索条件、処理結果などをクラスで表します。クラスを作るときは「何の情報を持つか」だけでなく「何に責任を持つか」を考えます。

## 関連リンク

- [Classes](https://learn.microsoft.com/dotnet/csharp/fundamentals/types/classes)
- [Objects](https://learn.microsoft.com/dotnet/csharp/fundamentals/object-oriented/objects)
