# VS Code と C# Dev Kit

## 目的

VS Code で C# の補完、エラー表示、デバッグを使える状態にします。

## 要点

- 注意: `.cs` ファイルだけを開いていて、プロジェクトフォルダを開いていない。
- 注意: SDK を入れる前に C# Dev Kit の問題だと思い込む。
- 注意: build が失敗しているのに debug 設定だけを直そうとする。

## インストール

VS Code:

```powershell
winget install --id Microsoft.VisualStudioCode --source winget
```

C# Dev Kit:

```powershell
code --install-extension ms-dotnettools.csdevkit
```

`code` が見つからない場合は、VS Code を一度開き直してから再実行します。

## 確認

```powershell
dotnet new console -n VscodeCheck
code VscodeCheck
```

VS Code で `Program.cs` を開き、C# の色分けや補完が効けば成功です。

## デバッグの最小手順

1. C# プロジェクトのフォルダを VS Code で開く。
2. `Program.cs` の行番号の左をクリックして breakpoint を置く。
3. `F5` または Run and Debug から実行する。
4. 止まったら Variables で値を確認する。

最初は `launch.json` を手で作る必要はありません。C# Dev Kit が自動認識できない場合だけ設定を見直します。

## 関連リンク

- [Visual Studio Code](https://code.visualstudio.com/)
- [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
- [Debug C# in Visual Studio Code](https://code.visualstudio.com/docs/csharp/debugging)
