# TODO CLI

## 目的

ファイル保存、コマンド分岐、コレクション操作を使って TODO 管理 CLI を作ります。

## 作るもの

`add`, `list`, `done` のようなコマンドで TODO を操作するコンソールアプリです。

## 学習ポイント

- `args` の読み取り
- `switch expression` または `switch` によるコマンド分岐
- JSON ファイル保存
- TODO の class / record 設計
- xUnit によるコマンド解析と保存処理のテスト

## 確認コマンド

```powershell
dotnet new console -n TodoCli
dotnet run -- add "Learn C#"
dotnet run -- list
dotnet test
```

## 完了条件

- TODO を追加できる。
- TODO 一覧を表示できる。
- 完了状態を変更できる。
- データがファイルに保存される。
- コマンド解析と TODO 操作の主要ケースを `dotnet test` で確認できる。

## テスト観点

- [テストプロジェクト構成](../08_テストと品質/08_テストプロジェクト構成.md) を参考に、アプリ本体とテストプロジェクトを分ける。
- [Arrange / Act / Assert](../08_テストと品質/02_ArrangeActAssert.md) を参考に、コマンド解析の正常系と異常系を AAA で書く。
- [モックとスタブ](../08_テストと品質/03_モックとスタブ.md) を参考に、現在時刻やファイル保存を差し替え可能にする。
- [カバレッジ測定](../08_テストと品質/11_カバレッジ測定.md) を参考に、重要な分岐がテストされているか確認する。
