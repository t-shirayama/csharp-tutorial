# よく使う dotnet コマンド

## 環境確認

```powershell
dotnet --info
dotnet --list-sdks
```

## 作成

```powershell
dotnet new console -n Sample
dotnet new webapi -n SampleApi
dotnet new xunit -n Sample.Tests
```

## 実行と検証

```powershell
dotnet restore
dotnet build
dotnet run
dotnet test
dotnet format --verify-no-changes
```

## パッケージ

```powershell
dotnet add package PackageName
dotnet list package
```

## 関連

- [dotnet CLI](../11_ツールと運用/01_dotnetCLI.md)
