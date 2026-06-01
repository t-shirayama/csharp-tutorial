# Options 検証エラー

## 症状

起動時に options validation のエラーが出る、または設定値が空のまま実行されます。

## 主な原因

- section 名が `appsettings.json` と Options class で一致していない。
- 必須設定が未設定。
- 環境変数の `__` 区切りを間違えている。
- `ValidateOnStart()` がなく、実行時まで気づかない。

## 確認コマンド

```powershell
dotnet run
$env:ExternalApi__BaseUrl
```

## 解決手順

1. Options class の `SectionName` を確認する。
2. `appsettings.json` の階層を確認する。
3. 環境変数や User Secrets の値を確認する。
4. `ValidateOnStart()` を使い、起動時に失敗させる。

## 関連リンク

- [IOptions と Configuration](../07_設計と実務パターン/10_IOptionsとConfiguration.md)
- [Secret 管理](../11_ツールと運用/10_Secret管理.md)
