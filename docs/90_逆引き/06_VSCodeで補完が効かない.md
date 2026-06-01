# VS Code で補完が効かない

## 症状

C# ファイルで補完、定義へ移動、エラー表示が効きません。

## 確認すること

- C# Dev Kit が入っているか。
- `.csproj` または `.sln` を含むフォルダを開いているか。
- .NET SDK が認識されているか。
- 拡張機能の出力にエラーがないか。

## 確認コマンド

```powershell
dotnet --info
dotnet build
```

## 対処

1. VS Code を再読み込みする。
2. `.csproj` のあるフォルダを開き直す。
3. C# Dev Kit の出力ログを見る。
4. SDK インストール後なら VS Code を再起動する。

## 関連

- [VS Code と C# Dev Kit](../00_環境構築/02_vscode-csharp.md)
