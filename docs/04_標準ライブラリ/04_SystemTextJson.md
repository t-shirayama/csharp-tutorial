# System.Text.Json と JSON 契約

## 目的

.NET 標準の JSON 処理ライブラリ `System.Text.Json` の基本と、API 契約を壊さないための命名規則、互換性の考え方を理解します。

## 要点

- `JsonSerializer.Serialize` でオブジェクトを JSON にします。
- `JsonSerializer.Deserialize<T>` で JSON をオブジェクトに戻します。
- C# は PascalCase、JSON は camelCase がよく使われます。プロパティ名、null、日時、enum の表現は `JsonSerializerOptions` や属性で制御します。
- API の JSON property 名は利用者との契約です。追加は比較的安全ですが、削除、名前変更、型変更は破壊的変更になりやすいです。

## コード例

```csharp
// この例では「System.Text.Json」の要点を最小のコードで確認します。
using System.Text.Json;
using System.Text.Json.Serialization;

var product = new Product("Keyboard", 12000m);
var options = new JsonSerializerOptions
{
    // C# の PascalCase property を JSON では camelCase として出力します。
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,

    // 学習やログ確認では読みやすくなります。本番 API では必要性を判断します。
    WriteIndented = true
};

var json = JsonSerializer.Serialize(product, options);

Console.WriteLine(json);

var restored = JsonSerializer.Deserialize<Product>(json, options);
Console.WriteLine(restored?.Name);

public record Product(
    [property: JsonPropertyName("display_name")] string Name,
    decimal Price);
```

## コードの読み方

`JsonSerializerOptions` は JSON の出力形式を決める設定です。`PropertyNamingPolicy` を camelCase にすると、`DisplayName` は JSON では `displayName` になります。

`JsonPropertyName` は C# 側の名前とは別に JSON 上の名前を固定します。公開 API では property 名が client の実装に使われるため、名前を変えると互換性に影響します。

`Deserialize<T>` の結果は null になる可能性があります。入力 JSON が壊れている場合や想定外の形式の場合にどう扱うかを、API 境界やファイル読み込みの境界で決めます。

## 実務での使い方

API のリクエスト/レスポンス、設定ファイル、外部サービス連携で使います。公開 API では JSON 形式が契約になるため、名前、null の扱い、日付形式、enum の表現をチームで揃えます。

互換性を守るには、DTO の property 名を安易に変更しない、削除や型変更を破壊的変更として扱う、必要に応じて `JsonPropertyName` で wire format を固定する、という判断が必要です。

## よくあるミス

- deserialize 結果が null になる可能性を無視する。
- C# のプロパティ名変更が JSON 契約を壊すことに気づかない。
- null と未指定の違いを考えない。
- 日時や enum の表現を決めずに API を公開する。
- enum を数値で返して意味が伝わらない。

## 関連リンク

- [System.Text.Json](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/overview)
- [Customize property names and values with System.Text.Json](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/customize-properties)
