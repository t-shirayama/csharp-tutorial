# CI で dotnet test 失敗

## 症状

ローカルでは成功するのに、GitHub Actions などの CI で `dotnet test` が失敗します。

## 主な原因

- SDK version が違う。
- secret や環境変数が CI にない。
- OS 差分で path や改行に依存している。
- integration test に必要な Docker や DB がない。
- テストが時刻や実行順に依存している。

## 確認コマンド

```powershell
dotnet --info
dotnet test --configuration Release
```

## 解決手順

1. CI log の最初の失敗を読む。
2. `actions/setup-dotnet` と `global.json` の version を揃える。
3. 必要な environment variables と secrets を確認する。
4. integration test の実行条件を分ける。
5. flaky test は原因を直し、単なる再実行で隠さない。

## 関連リンク

- [CI でテストを実行する](../08_テストと品質/12_CIでテストを実行する.md)
- [global.json](../11_ツールと運用/08_global-json.md)
