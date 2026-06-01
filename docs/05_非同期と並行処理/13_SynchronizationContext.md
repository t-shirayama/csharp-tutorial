# SynchronizationContext

## 目的

`SynchronizationContext` の役割と、async / await の継続処理との関係を理解します。

## 前提

- [async / await](02_async-await.md) を読んでいる
- [非同期処理のよくある落とし穴](07_非同期処理のよくある落とし穴.md) を読んでいる

## 要点

- `SynchronizationContext` は継続処理をどこで実行するかに関係します。
- UI アプリでは UI thread に戻る必要があります。
- ASP.NET Core には従来の ASP.NET のような request context capture はありません。
- `.Result` や `.Wait()` は context によって deadlock の原因になります。
- 注意: async method を `.Result` で同期的に待つ。
- 注意: UI thread 以外から UI component を更新する。
- 注意: `ConfigureAwait(false)` を意味を理解せず全コードに付ける。

## コード例

```csharp
// この例では「SynchronizationContext」の要点を最小のコードで確認します。
public async Task<string> LoadAsync()
{
    await Task.Delay(100);
    return "done";
}
```

## ConfigureAwait の例

```csharp
// この例では「SynchronizationContext」の要点を最小のコードで確認します。
public async Task<string> LoadLibraryValueAsync()
{
    await Task.Delay(100).ConfigureAwait(false);
    return "done";
}
```

`await` の後の処理は、環境によって元の context に戻ることがあります。library code では UI context に戻る必要がないため、`ConfigureAwait(false)` を使う場面があります。ただし ASP.NET Core の通常アプリコードでは、機械的に付ける必要はありません。

## 実務での使い方

WPF、WinForms、古い ASP.NET、library 開発、非同期 deadlock 調査で重要です。ASP.NET Core Web API では、まず `.Result` / `.Wait()` を避け、async を上まで伝播させます。

## 関連リンク

- [SynchronizationContext Class](https://learn.microsoft.com/dotnet/api/system.threading.synchronizationcontext)
- [ConfigureAwait FAQ](https://devblogs.microsoft.com/dotnet/configureawait-faq/)
