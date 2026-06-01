# NuGet 復元エラー

## 症状

`dotnet restore` や `dotnet build` でパッケージ復元に失敗します。

## 確認コマンド

```powershell
dotnet restore
dotnet nuget list source
dotnet list package
```

## 主な原因

- ネットワーク接続やプロキシ問題。
- private feed の認証切れ。
- 存在しないパッケージバージョンを参照している。
- NuGet source 設定が壊れている。

## 対処

1. エラーメッセージのパッケージ名とバージョンを見る。
2. NuGet source を確認する。
3. private feed の認証を更新する。
4. `obj` や cache の問題が疑わしい場合は原因を確認してから削除する。

## 関連

- [NuGet](../11_ツールと運用/02_NuGet.md)
