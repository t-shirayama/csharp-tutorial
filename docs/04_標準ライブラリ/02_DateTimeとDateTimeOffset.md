# DateTime と DateTimeOffset

## 目的

日時を扱う基本と、`DateTime` と `DateTimeOffset` の使い分けを理解します。

## 要点

- `DateTime.Now` はローカル時刻、`DateTime.UtcNow` は UTC です。
- `DateTimeOffset` は時刻と UTC からのオフセットを持ちます。
- 実務では保存や API 連携でタイムゾーンを明確にします。
- 注意: ローカル時刻と UTC を混ぜる。
- 注意: 日付だけの値に時刻やタイムゾーンの意味を持たせる。
- 注意: 文字列化した日時を再パースして誤差やタイムゾーンずれを起こす。

## コード例

```csharp
// この例では「DateTime と DateTimeOffset」の要点を最小のコードで確認します。
var now = DateTimeOffset.Now;
var utcNow = DateTimeOffset.UtcNow;

Console.WriteLine(now);
Console.WriteLine(utcNow);
Console.WriteLine(now.ToString("yyyy-MM-dd HH:mm:ss"));
```

## 実務での使い方

DB 保存や API の日時は UTC または `DateTimeOffset` で扱う方針を決めます。画面表示ではユーザーのタイムゾーンに変換します。

## 関連リンク

- [DateTimeOffset](https://learn.microsoft.com/dotnet/api/system.datetimeoffset)
