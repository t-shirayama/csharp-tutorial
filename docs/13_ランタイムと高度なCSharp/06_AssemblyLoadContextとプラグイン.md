# AssemblyLoadContext とプラグイン

## 目的

`AssemblyLoadContext` を使った assembly load の分離と plugin model の入口を理解します。

## 前提

- [アセンブリとメタデータ](05_アセンブリとメタデータ.md) を読んでいる

## 要点

- `AssemblyLoadContext` は assembly を読み込む context です。
- plugin ごとに依存関係を分離したい場合に使います。
- unload 可能な context を作ると、plugin を破棄できる設計にできます。
- 実装は難しいため、まず公式 sample と既存 library を確認します。
- 注意: plugin assembly、Type、instance、delegate、event handler への参照が残ると unload できません。
- 注意: default context と plugin context の依存関係を混ぜると load error や境界破壊につながります。
- 注意: plugin は host の内部型へ直接依存させず、contract assembly 経由で呼び出します。

## コード例

```csharp
// この例では「AssemblyLoadContext とプラグイン」の要点を最小のコードで確認します。
using System.Reflection;
using System.Runtime.Loader;

var path = Path.GetFullPath("Plugin.dll");
var loadContext = new AssemblyLoadContext("Plugin", isCollectible: true);

Assembly assembly = loadContext.LoadFromAssemblyPath(path);
Console.WriteLine(assembly.FullName);

loadContext.Unload();
```

## plugin contract の例

```csharp
public interface IPluginCommand
{
    string Name { get; }

    Task ExecuteAsync(CancellationToken cancellationToken);
}
```

host application と plugin が同じ contract assembly を参照すると、host は plugin の具象型を知らなくても interface 経由で呼び出せます。

## plugin discovery の例

```csharp
var pluginTypes = assembly.GetTypes()
    .Where(type => typeof(IPluginCommand).IsAssignableFrom(type))
    .Where(type => type is { IsAbstract: false, IsInterface: false });

foreach (var pluginType in pluginTypes)
{
    if (Activator.CreateInstance(pluginType) is IPluginCommand command)
    {
        await command.ExecuteAsync(cancellationToken);
    }
}
```

`AssemblyLoadContext` を作り、指定 path の assembly を読み込んでいます。`isCollectible: true` にすると unload 可能な context になります。ただし、読み込んだ型や instance への参照が残っていると unload されません。

`IPluginCommand` は host と plugin の境界です。`assembly.GetTypes()` で plugin assembly 内の型を探し、interface を実装している具象型だけを作成しています。実務では DI、constructor parameter、例外処理、timeout、権限確認を追加します。

## 実務での使い方

plugin architecture、script runner、拡張機能、tooling で使います。通常の Web API や業務アプリでは必要になることは少なく、依存関係を複雑にしやすいため慎重に使います。

plugin を unload したい場合は、plugin instance、Type、Assembly、delegate、event handler への参照を残さないようにします。load error が起きたら、plugin 本体だけでなく依存 assembly の version と配置場所も確認します。

## 関連リンク

- [AssemblyLoadContext Class](https://learn.microsoft.com/dotnet/api/system.runtime.loader.assemblyloadcontext)
- [Create a .NET Core application with plugins](https://learn.microsoft.com/dotnet/core/tutorials/creating-app-with-plugin-support)
