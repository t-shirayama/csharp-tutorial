# EF Core Migration 失敗

## 症状

`dotnet ef migrations add` や `dotnet ef database update` が失敗します。

## 主な原因

- `dotnet-ef` tool が復元されていない。
- startup project と DbContext project の指定が違う。
- 接続文字列が未設定。
- migration の変更内容が既存 DB と矛盾している。

## 確認コマンド

```powershell
dotnet tool restore
dotnet ef --version
dotnet ef dbcontext list
```

## 解決手順

1. `dotnet ef --version` が実行できるか確認する。
2. DbContext がある project と起動 project を確認する。
3. 接続文字列の供給元を確認する。
4. 生成された migration の差分を読む。
5. 本番 DB に適用する前に検証 DB で確認する。

## 関連リンク

- [Migration](../09_データアクセス/05_Migration.md)
- [接続文字列と Secret](../09_データアクセス/10_接続文字列とSecret.md)
- [ローカルツールと manifest](../11_ツールと運用/09_ローカルツールとmanifest.md)
