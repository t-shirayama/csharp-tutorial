# SDK バージョン管理

## 目的

ローカルと CI で使う .NET SDK バージョンをそろえます。

## 確認

```powershell
dotnet --version
dotnet --list-sdks
```

`dotnet --version` は現在選ばれている SDK、`dotnet --list-sdks` はインストール済み SDK を表示します。

## global.json

リポジトリで使う SDK を固定したい場合は、repository root に `global.json` を置きます。

```powershell
dotnet new globaljson --sdk-version 10.0.100 --roll-forward latestFeature
```

例:

```json
{
  "sdk": {
    "version": "10.0.100",
    "rollForward": "latestFeature"
  }
}
```

`version` には `10.0.x` のような省略形ではなく、`dotnet --list-sdks` に出る完全な SDK バージョンを書きます。

## よくあるミス

- `global.json` が要求する SDK をローカルに入れていない。
- CI だけ古い SDK を使っている。
- Runtime と SDK を混同している。

## 関連リンク

- [global.json overview](https://learn.microsoft.com/dotnet/core/tools/global-json)
- [.NET SDK overview](https://learn.microsoft.com/dotnet/core/sdk)
