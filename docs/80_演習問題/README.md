# 演習問題

各記事にあった練習問題、演習問題、発展課題を集約したページです。
記事本文で概念を確認したあと、このページで手を動かして定着させます。

## 使い方

1. 元記事を読む。
2. 対応する演習問題を解く。
3. 期待した結果と違う場合は、元記事の要点、コードの読み方、よくあるミスに戻る。

## 環境構築

<a id="ex-20545cecc3"></a>
### [.NET SDK のインストールと確認](../00_環境構築/01_dotnet-sdk.md)

#### 練習問題

1. `HelloCSharp` というコンソールアプリを作成する。
2. `Console.WriteLine` の文字列を自分の名前に変更する。
3. `dotnet run` で変更が反映されることを確認する。

<a id="ex-c0f90c5b1d"></a>
### [VS Code と C# Dev Kit](../00_環境構築/02_vscode-csharp.md)

#### 練習問題

1. VS Code で `Program.cs` を開く。
2. `Console.WriteLine` にブレークポイントを置く。
3. デバッグ実行して処理が止まることを確認する。

<a id="ex-00b05cf2bd"></a>
### [プロジェクト作成と実行](../00_環境構築/03_プロジェクト作成と実行.md)

#### 練習問題

1. console project を作成して `dotnet run` する。
2. solution を作成して project を追加する。
3. solution root で `dotnet build` が通ることを確認する。
4. xUnit test project を追加して `dotnet test` が通ることを確認する。
5. 既存 repository を clone した想定で、`git status`、`dotnet restore`、`dotnet build` の確認手順を書く。

<a id="ex-f7f8b6eee8"></a>
### [SDK バージョン管理](../00_環境構築/04_SDKバージョン管理.md)

#### 練習問題

1. `dotnet --list-sdks` でインストール済み SDK を確認する。
2. `global.json` を作成する。
3. `dotnet --version` の表示が変わるか確認する。
4. CI で使う SDK バージョンも同じにする方針を書く。

## 基礎文法

<a id="ex-fee2b9c6d3"></a>
### [C# のプログラム構造](../01_基礎文法/01_プログラム構造.md)

#### 練習問題

1. `dotnet new console -n ProgramStructure` を実行する。
2. 生成された `Program.cs` を確認する。
3. 表示文字列を変更して `dotnet run` する。
4. `Main` メソッドを明示する形に書き換えて、同じ出力になることを確認する。

<a id="ex-c4d135c164"></a>
### [変数と型](../01_基礎文法/02_変数と型.md)

#### 練習問題

1. 商品名、単価、数量を変数に入れて、合計金額を表示する。
2. `var` を使った場合と明示的な型を書いた場合で、読みやすさを比べる。
3. null になる可能性がある `string?` を定義し、null のときだけメッセージを表示する。

<a id="ex-20215fd86f"></a>
### [条件分岐](../01_基礎文法/03_条件分岐.md)

#### 練習問題

1. 点数を入力して、A/B/C/D の評価を表示する。
2. コマンド文字列 `add`, `delete`, `list` によって表示メッセージを変える。
3. `if` で書いた分岐を `switch expression` に書き換える。

<a id="ex-a07321de27"></a>
### [繰り返し](../01_基礎文法/04_繰り返し.md)

#### 練習問題

1. 1 から 100 までの合計を表示する。
2. 名前の配列を `foreach` で表示する。
3. 1 から 20 までの数のうち、偶数だけ表示する。
4. `break` を使って、最初に見つかった条件一致の値で処理を止める。

<a id="ex-4c3616177a"></a>
### [メソッド](../01_基礎文法/05_メソッド.md)

#### 練習問題

1. 2つの数値を受け取って合計を返すメソッドを作る。
2. 商品の単価と数量から合計金額を返すメソッドを作る。
3. 点数を受け取って A/B/C/D を返すメソッドを作る。
4. コンソール電卓の計算処理をメソッドに分ける。

<a id="ex-e949ba0978"></a>
### [演算子](../01_基礎文法/06_演算子.md)

#### 練習問題

1. 税抜価格と税率から税込価格を計算する。
2. 年齢と会員フラグから、割引対象かどうかを判定する。
3. null の可能性がある名前を、未設定の場合は `"Guest"` として表示する。
4. 複雑な `if` 条件を、意味のある bool 変数に分ける。

<a id="ex-c5d9ea85b5"></a>
### [例外処理の入口](../01_基礎文法/07_例外処理の入口.md)

#### 練習問題

1. `int.Parse` で例外が起きるコードを書き、例外メッセージを確認する。
2. 同じ処理を `int.TryParse` で書き換える。
3. コンソール電卓に、数値以外が入力された場合のメッセージを追加する。
4. 0 除算を事前にチェックして、ユーザーに分かるメッセージを表示する。

<a id="ex-fab3f73b57"></a>
### [入力と出力](../01_基礎文法/08_入力と出力.md)

#### 練習問題

1. 名前を入力して挨拶を表示する。
2. 2つの数値を入力して合計を表示する。
3. 数値以外が入力された場合のメッセージを出す。
4. 計算処理をメソッドに分ける。

<a id="ex-49a0f37516"></a>
### [スコープと変数の寿命](../01_基礎文法/09_スコープと変数の寿命.md)

#### 練習問題

1. `if` ブロック内の変数を外から参照できないことを確認する。
2. ループ内だけで使う変数をループ内へ移す。
3. 長いメソッドから一時変数の寿命を短くする。

<a id="ex-9ee65283a3"></a>
### [デバッグの基本](../01_基礎文法/10_デバッグの基本.md)

#### 練習問題

1. わざとコンパイルエラーを出し、最初の error を読む。
2. breakpoint を置いて変数の値を確認する。
3. バグ報告テンプレートを作る。

<a id="ex-79459ecd2d"></a>
### [ステートメントと式](../01_基礎文法/11_ステートメントと式.md)

#### 練習問題

1. 自分のコードから式を 3 つ探す。
2. ステートメントを 3 つ探す。
3. 長い式に一時変数名を付けて読みやすくする。

<a id="ex-cc2dca193b"></a>
### [プリプロセッサディレクティブ](../01_基礎文法/12_プリプロセッサディレクティブ.md)

#### 練習問題

1. `#nullable enable` を入れたときに警告が出るコードを書く。
2. `#if DEBUG` で debug 時だけ出る message を追加する。
3. `#pragma` を使うなら、なぜ必要かコメントで説明する。

<a id="ex-04282b5f6b"></a>
### [タプルと dynamic](../01_基礎文法/13_タプルとdynamic.md)

#### 練習問題

1. `(bool Success, string Message)` を返す method を作る。
2. 同じ内容を record にした場合と読み比べる。
3. `dynamic` で存在しない property を呼び、実行時エラーを確認する。

<a id="ex-f5db4ad1be"></a>
### [文字列操作](../01_基礎文法/14_文字列操作.md)

#### 練習問題

1. 名前を入力し、前後の空白を取り除いて表示する。
2. 空白だけの入力をエラーにする。
3. `start`、`STOP`、`List` のような command を大文字小文字を無視して判定する。
4. カンマ区切りの文字列を分割し、各項目を `Trim()` して表示する。

<a id="ex-9c7870f4ca"></a>
### [型変換と Parse](../01_基礎文法/15_型変換とParse.md)

#### 練習問題

1. 数量を文字列で受け取り、`int.TryParse` で変換する。
2. 単価を文字列で受け取り、`decimal.TryParse` で変換する。
3. 変換できるが 0 以下の値をエラーにする。
4. 小数を切り捨てる場合と四捨五入する場合の結果を比べる。

<a id="ex-64877ed5ca"></a>
### [日付と時刻の基本](../01_基礎文法/16_日付と時刻の基本.md)

#### 練習問題

1. 今日の日付を `yyyy-MM-dd` 形式で表示する。
2. 入力した期限が過去日ならエラーにする。
3. 開始時刻と終了時刻から処理時間を秒で表示する。
4. `DateTime.Now` と `DateTimeOffset.UtcNow` の出力を比べる。

<a id="ex-6340f52ec5"></a>
### [using とリソース解放](../01_基礎文法/17_usingとリソース解放.md)

#### 練習問題

1. `StreamWriter` と `using` を使ってテキストファイルを書く。
2. `StreamReader` と `using` を使ってテキストファイルを読む。
3. 同じ処理を `File.WriteAllText` / `File.ReadAllText` で書き換える。
4. `using` のブロック外で writer を使えないことを確認する。

<a id="ex-efb49a994e"></a>
### [小さなコンソールアプリ実践](../01_基礎文法/18_小さなコンソールアプリ実践.md)

#### 発展課題

1. 複数の商品を `while` で入力できるようにする。
2. 合計が一定額以上なら送料を無料にする。
3. 税率を入力できるようにし、0 以上 1 以下か検証する。
4. 注文内容をファイルに保存する。

## オブジェクト指向

<a id="ex-7dde6365df"></a>
### [class と object](../02_オブジェクト指向/01_classとobject.md)

#### 練習問題

1. `Book` クラスを作り、タイトル、著者、価格を持たせる。
2. `Book` オブジェクトを作成し、コンソールに情報を表示する。
3. `Customer` クラスを作り、名前とメールアドレスを持たせる。
4. クラス名とプロパティ名を見て、何を表しているか説明できるようにする。

<a id="ex-9d86a06db8"></a>
### [プロパティとメソッド](../02_オブジェクト指向/02_プロパティとメソッド.md)

#### 練習問題

1. `Product` クラスに商品名、価格、税込価格を返すメソッドを作る。
2. `Order` クラスに明細追加メソッドと合計金額プロパティを作る。
3. `Person` クラスに氏名を結合する計算プロパティを作る。
4. 外から変更できるべき値と、変更できない方がよい値を分類する。

<a id="ex-16bcaddbcb"></a>
### [コンストラクタ](../02_オブジェクト指向/03_コンストラクタ.md)

#### 練習問題

1. `Product` クラスを、商品名と価格が必須になるように作る。
2. 商品名が空、または価格が負の場合に例外を投げる。
3. `Customer` クラスを、名前とメールアドレス必須で作る。
4. object initializer で作る場合と、コンストラクタで作る場合の違いを説明する。

<a id="ex-379225e23e"></a>
### [record](../02_オブジェクト指向/04_record.md)

#### 練習問題

1. `EmailAddress` record を作る。
2. 同じ値の 2 つの record を `==` で比較する。
3. `with` 式で一部の値だけ変えた新しい record を作る。

<a id="ex-87f74420a5"></a>
### [interface](../02_オブジェクト指向/05_interface.md)

#### 練習問題

1. `IClock` interface を作り、現在時刻を返すメソッドを定義する。
2. `SystemClock` で実装する。
3. テスト用に固定時刻を返す `FixedClock` を作る。

<a id="ex-61965114ce"></a>
### [継承とポリモーフィズム](../02_オブジェクト指向/06_継承とポリモーフィズム.md)

#### 練習問題

1. `Shape` 抽象クラスと `Circle`, `Rectangle` を作る。
2. 面積を返す `CalculateArea` を override する。
3. 同じ一覧で異なる図形の面積を表示する。

<a id="ex-3f2146f182"></a>
### [カプセル化](../02_オブジェクト指向/07_カプセル化.md)

#### 練習問題

1. `Stock` クラスを作り、在庫数を直接 set できないようにする。
2. 入庫と出庫のメソッドで在庫数を変更する。
3. 出庫数が在庫数を超えた場合の扱いを決める。

<a id="ex-a1c5fab48e"></a>
### [値オブジェクト](../02_オブジェクト指向/08_値オブジェクト.md)

#### 練習問題

1. `Money` 型を作り、金額が負にならないようにする。
2. `EmailAddress` 型を使う service を作る。
3. 文字列引数と値オブジェクト引数の読みやすさを比較する。

<a id="ex-2225f5cc01"></a>
### [責務分割](../02_オブジェクト指向/09_責務分割.md)

#### 練習問題

1. 入力、計算、保存が混ざったメソッドを3つに分ける。
2. `TodoService` と `TodoRepository` の責務を書く。
3. `Manager` という名前のクラスを具体名へ変更する。

<a id="ex-bd0b3c20d7"></a>
### [static とインスタンス](../02_オブジェクト指向/10_staticとインスタンス.md)

#### 練習問題

1. 純粋な計算処理を `static` method にする。
2. 現在時刻を使う処理を `IClock` に分ける。
3. `static` がテストを難しくする例を説明する。

<a id="ex-f8d44d8635"></a>
### [struct](../02_オブジェクト指向/11_struct.md)

#### 練習問題

1. `Point2D` struct を作り、`X` と `Y` を持たせる。
2. `readonly struct` にして、作成後に変更できないことを確認する。
3. `default(Point2D)` の値を確認する。

<a id="ex-b61a690f8b"></a>
### [enum](../02_オブジェクト指向/12_enum.md)

#### 練習問題

1. `PaymentMethod` enum を作る。
2. `switch` 式で表示名を返す。
3. 未知の値を受け取った場合の扱いを考える。

<a id="ex-c106243b62"></a>
### [delegate と event](../02_オブジェクト指向/13_delegateとevent.md)

#### 練習問題

1. `ProgressChanged` event を持つ class を作る。
2. `+=` で進捗を console に出す handler を登録する。
3. 不要になった handler を `-=` で解除する。

<a id="ex-e0546820d3"></a>
### [フィールドとインデクサ](../02_オブジェクト指向/14_フィールドとインデクサ.md)

#### 練習問題

1. private field と public property を持つ class を作る。
2. `this[int index]` indexer を追加する。
3. indexer と `GetByIndex` method のどちらが読みやすいか比較する。

<a id="ex-c960521db2"></a>
### [演算子オーバーロード](../02_オブジェクト指向/15_演算子オーバーロード.md)

#### 練習問題

1. `Distance` 型を作り、`+` を定義する。
2. `Distance` の単位が違う場合にどう扱うか考える。
3. method 名の方が読みやすい処理を演算子にしていないか確認する。

<a id="ex-d9dd22548d"></a>
### [partial 型とネスト型](../02_オブジェクト指向/16_partial型とネスト型.md)

#### 練習問題

1. `partial class` を 2 つのファイルに分ける例を作る。
2. nested enum を持つ class を作る。
3. partial を使わず責務分割できないか考える。

## コレクションと LINQ

<a id="ex-bc6c3f7c66"></a>
### [配列と List](../03_コレクションとLINQ/01_配列とList.md)

#### 練習問題

1. 文字列の配列を作り、全要素を表示する。
2. `List<int>` に点数を追加して平均を計算する。
3. 空のリストを返すメソッドを書き、null を返さない理由を説明する。

<a id="ex-233f3754d7"></a>
### [Dictionary](../03_コレクションとLINQ/02_Dictionary.md)

#### 練習問題

1. 商品コードから商品名を引く Dictionary を作る。
2. `TryGetValue` で存在チェックする。
3. 文字列一覧の出現回数を Dictionary で集計する。

<a id="ex-7348849e1c"></a>
### [IEnumerable と IEnumerator](../03_コレクションとLINQ/03_IEnumerableとIEnumerator.md)

#### 練習問題

1. `List<string>` を `IEnumerable<string>` 変数に代入する。
2. `foreach` で表示する。
3. `ToList()` した場合との違いを説明する。

<a id="ex-435153f7bb"></a>
### [LINQ の基本](../03_コレクションとLINQ/04_LINQの基本.md)

#### 練習問題

1. 点数一覧から80点以上を抽出する。
2. 商品一覧から商品名だけを取り出す。
3. 在庫切れの商品が1件でもあるか `Any` で判定する。

<a id="ex-c517030a68"></a>
### [遅延評価](../03_コレクションとLINQ/05_遅延評価.md)

#### 練習問題

1. LINQ 定義後に元リストへ要素を追加し、結果を確認する。
2. `ToList` を入れた場合との違いを確認する。
3. 複数回列挙されるコードを探して、List 化する場所を考える。

<a id="ex-889aa73739"></a>
### [GroupBy と集計](../03_コレクションとLINQ/06_GroupByと集計.md)

#### 練習問題

1. 点数一覧を科目別に合計する。
2. 商品一覧をカテゴリ別に件数集計する。
3. 集計結果を record に変換する。

<a id="ex-cfdb5ab48a"></a>
### [null と空コレクション](../03_コレクションとLINQ/07_nullと空コレクション.md)

#### 練習問題

1. 条件に合う商品がない場合に空リストを返すメソッドを書く。
2. null を受け取った場合に例外にするか空扱いにするかを決める。
3. 呼び出し側の null チェックが減る API に書き換える。

<a id="ex-5d6e331ce9"></a>
### [SelectMany と Join](../03_コレクションとLINQ/08_SelectManyとJoin.md)

#### 練習問題

1. 顧客ごとの注文リストを全注文リストへ平坦化する。
2. 注文と顧客を `CustomerId` で結合する。
3. `Join` と `Dictionary` lookup の読みやすさを比較する。

<a id="ex-4ddc91db3e"></a>
### [LINQ の性能と ToList](../03_コレクションとLINQ/09_LINQの性能とToList.md)

#### 練習問題

1. `Where` の条件が何回呼ばれるか確認する。
2. `ToList()` の前後で挙動を比較する。
3. EF Core で `ToListAsync()` の位置を説明する。

<a id="ex-72f70d9240"></a>
### [読みやすい LINQ](../03_コレクションとLINQ/10_読みやすいLINQ.md)

#### 練習問題

1. 長い LINQ chain を途中変数で分ける。
2. 複雑な predicate を method に切り出す。
3. 副作用のある LINQ を `foreach` に書き換える。

<a id="ex-6e3b924833"></a>
### [集合、キュー、スタック](../03_コレクションとLINQ/11_集合とキューとスタック.md)

#### 練習問題

1. `HashSet<string>` で重複する ID を除外する。
2. `Queue<string>` で処理待ち一覧を作る。
3. `Stack<string>` で簡単な undo 履歴を表す。

<a id="ex-6fab71084e"></a>
### [不変コレクション](../03_コレクションとLINQ/12_不変コレクション.md)

#### 練習問題

1. `ImmutableArray<int>` に値を追加する。
2. 元の instance が変わらないことを確認する。
3. `ReadOnlyCollection<T>` と何が違うか説明する。

<a id="ex-4a60375257"></a>
### [Index と Range](../03_コレクションとLINQ/13_IndexとRange.md)

#### 練習問題

1. 文字列の先頭 3 文字を取り出す。
2. 配列の最後の要素を `^1` で取る。
3. `..`, `1..`, `..^1` の意味を確認する。

<a id="ex-6db9fe2dc1"></a>
### [ソートとページング](../03_コレクションとLINQ/14_ソートとページング.md)

#### 練習問題

1. 商品一覧を価格の高い順、同額なら商品名順に並べる。
2. `page` と `pageSize` を受け取り、2 page 目のデータだけを返す。
3. 1,000 件の ID を 200 件ずつ `Chunk` で分割する。

<a id="ex-dd57f841d7"></a>
### [取得系 LINQ の使い分け](../03_コレクションとLINQ/15_取得系LINQの使い分け.md)

#### 練習問題

1. 商品コードで商品を1件検索する処理を `SingleOrDefault` で書く。
2. 有効な user の先頭だけを `FirstOrDefault` で取得し、見つからない場合を表示する。
3. `First` と `Single` がそれぞれ例外になる条件を確認する。

<a id="ex-f20cd31bea"></a>
### [コレクションの公開と変更](../03_コレクションとLINQ/16_コレクションの公開と変更.md)

#### 練習問題

1. `List<T>` を公開している property を `IReadOnlyList<T>` に変更する。
2. `foreach` 中に削除している処理を `RemoveAll` に書き換える。
3. `IEnumerable<T>`、`IReadOnlyList<T>`、`ImmutableArray<T>` のどれを返すべきか、3つのケースで判断する。

## 標準ライブラリ

<a id="ex-5c0831a673"></a>
### [string](../04_標準ライブラリ/01_string.md)

#### 練習問題

1. 空白だけの文字列を未入力として判定する。
2. 大文字小文字を無視してキーワード検索する。
3. CSV 風の文字列を `Split` で分割する。

<a id="ex-10c9bb678c"></a>
### [DateTime と DateTimeOffset](../04_標準ライブラリ/02_DateTimeとDateTimeOffset.md)

#### 練習問題

1. 現在時刻を UTC とローカルで表示する。
2. 日付を `yyyy-MM-dd` 形式で表示する。
3. 期限日が現在より過去かどうか判定する。

<a id="ex-c37ee95a4d"></a>
### [File / Directory / Path](../04_標準ライブラリ/03_FileDirectoryPath.md)

#### 練習問題

1. `output` フォルダを作る。
2. UTF-8 でテキストファイルを書き込む。
3. ファイルが存在する場合だけ読み込む。

<a id="ex-34b66d142b"></a>
### [System.Text.Json](../04_標準ライブラリ/04_SystemTextJson.md)

#### 練習問題

1. record を JSON に変換する。
2. JSON から record に戻す。
3. camelCase にする option を調べて試す。

<a id="ex-130c49dc9f"></a>
### [Regex](../04_標準ライブラリ/05_Regex.md)

#### 練習問題

1. 郵便番号形式をチェックする。
2. 文字列から数字だけを抽出する。
3. 部分一致と完全一致の違いを確認する。

<a id="ex-b811e64c07"></a>
### [HttpClient](../04_標準ライブラリ/06_HttpClient.md)

#### 練習問題

1. GET リクエストを送り、ステータスコードを表示する。
2. 失敗時に `EnsureSuccessStatusCode` の挙動を確認する。
3. `CancellationToken` を渡す形に書き換える。

<a id="ex-7b860097d5"></a>
### [Environment と設定値](../04_標準ライブラリ/07_Environmentと設定値.md)

#### 練習問題

1. 任意の環境変数を PowerShell で設定し、C# から読む。
2. 値がない場合のデフォルト値を決める。
3. 設定値の必須チェックをメソッドに分ける。

<a id="ex-cc6446fd8f"></a>
### [IDisposable と using](../04_標準ライブラリ/11_IDisposableとusing.md)

#### 練習問題

1. `StreamWriter` で UTF-8 のファイルを書き込む。
2. `using var` を外した場合、どのような問題が起き得るか説明する。
3. `IDisposable` を実装すべき class と不要な class を 3 つずつ挙げる。

<a id="ex-3ad1eb810d"></a>
### [Stream と FileStream](../04_標準ライブラリ/12_StreamとFileStream.md)

#### 練習問題

1. 小さなテキストファイルを `File.ReadAllText` で読む。
2. 同じファイルを `FileStream` と `StreamReader` で読む。
3. 大きなファイルを想定して、全読み込みと逐次読み込みの違いを説明する。

<a id="ex-d0a42e5929"></a>
### [TextReader と Encoding](../04_標準ライブラリ/13_TextReaderとEncoding.md)

#### 練習問題

1. UTF-8 のテキストファイルを作る。
2. `StreamReader` で 1 行ずつ読む。
3. encoding を変えたときに文字化けする例を確認する。

<a id="ex-bede169e00"></a>
### [Binary I/O](../04_標準ライブラリ/14_BinaryIO.md)

#### 練習問題

1. `int` と `string` を binary file に書く。
2. 書いた順番と逆に読んだらどうなるか確認する。
3. format version として先頭に `int` を追加する。

<a id="ex-40b2a2fc48"></a>
### [StringBuilder](../04_標準ライブラリ/15_StringBuilder.md)

#### 練習問題

1. 10 行の report text を `StringBuilder` で作る。
2. `+` 連結版と読みやすさを比較する。
3. SQL 生成に使う場合の危険性を説明する。

<a id="ex-832009c922"></a>
### [TimeSpan](../04_標準ライブラリ/16_TimeSpan.md)

#### 練習問題

1. `TimeSpan.FromMinutes(5)` で cache lifetime を表す。
2. `TotalSeconds` と `Seconds` の違いを確認する。
3. timeout 設定名に単位を含める例を考える。

## 非同期と並行処理

<a id="ex-9b955dbe91"></a>
### [非同期処理のよくある落とし穴](../05_非同期と並行処理/07_非同期処理のよくある落とし穴.md)

#### 練習問題

1. `.Result` を使ったコードを `await` に直す。
2. `CancellationToken` を引数に追加する。
3. `Task.WhenAll` の同時実行数を制限する方法を調べる。

<a id="ex-dea12b16a1"></a>
### [Thread と ThreadPool](../05_非同期と並行処理/11_ThreadとThreadPool.md)

#### 練習問題

1. `Thread` で message を出す。
2. 同じ処理を `Task.Run` で書く。
3. どちらが実務で扱いやすいか説明する。

<a id="ex-f1ee765f77"></a>
### [lock と同期プリミティブ](../05_非同期と並行処理/12_lockと同期プリミティブ.md)

#### 練習問題

1. 複数 task から同じ `int` を更新し、結果がずれる例を作る。
2. `lock` で守る。
3. `Interlocked.Increment` に置き換える。

<a id="ex-aedb1f38d4"></a>
### [SynchronizationContext](../05_非同期と並行処理/13_SynchronizationContext.md)

#### 練習問題

1. async method を `.Result` で呼ぶコードを探す。
2. `await` に置き換える。
3. library code と application code で `ConfigureAwait(false)` の判断が違う理由を説明する。

<a id="ex-1d9c58e1c3"></a>
### [TPL Dataflow の入口](../05_非同期と並行処理/14_TPLDataflowの入口.md)

#### 練習問題

1. `TransformBlock<int, int>` で 2 倍にする pipeline を作る。
2. `ActionBlock<int>` で出力する。
3. bounded capacity を設定して backpressure を確認する。

<a id="ex-fea9a1ab0a"></a>
### [Rx の入口](../05_非同期と並行処理/15_Rxの入口.md)

#### 練習問題

1. `Observable.Range(1, 5)` を購読する。
2. `Where` と `Select` で値を変換する。
3. subscription を `Dispose` する場所を考える。

<a id="ex-420dc4d61b"></a>
### [ValueTask](../05_非同期と並行処理/16_ValueTask.md)

#### 練習問題

1. cache hit が多い method を `Task` と `ValueTask` で比較する。
2. `ValueTask` を使う理由をコメントなしで説明できるか確認する。
3. 通常の service method では `Task` を選ぶ理由を説明する。

<a id="ex-d260a19d7a"></a>
### [IProgress](../05_非同期と並行処理/17_IProgress.md)

#### 練習問題

1. console に進捗率を出す `Progress<int>` を作る。
2. `CancellationToken` で途中停止できるようにする。
3. 進捗通知の間隔を 1% と 10% で比較する。

## 型システムと言語機能

<a id="ex-5d9a4c72c6"></a>
### [ジェネリック制約](../06_型システムと言語機能/11_ジェネリック制約.md)

#### 練習問題

1. `where T : class` の method を作る。
2. `where T : IComparable<T>` で比較できる method を作る。
3. 制約を付けすぎた場合の使いにくさを考える。

<a id="ex-0d0813a341"></a>
### [共変性と反変性](../06_型システムと言語機能/12_共変性と反変性.md)

#### 練習問題

1. `IEnumerable<string>` を `IEnumerable<object>` に代入する。
2. `List<string>` を `List<object>` に代入できないことを確認する。
3. `Func<string>` と `Func<object>` の代入関係を確認する。

<a id="ex-21f92090c5"></a>
### [attributes](../06_型システムと言語機能/05_attributes.md)

#### 練習問題

1. method に付ける `RequiresRoleAttribute` を作る。
2. reflection でその attribute を取得する。
3. attribute ではなく DI や設定で表すべき例を考える。

<a id="ex-5e2524aa15"></a>
### [reflection](../06_型システムと言語機能/06_reflection.md)

#### 練習問題

1. class の public property 名を一覧表示する。
2. `nameof` を使って property を取得する。
3. reflection を使わない書き方と比較する。

<a id="ex-592010fec6"></a>
### [ref / out / in parameters](../06_型システムと言語機能/15_ref-out-in.md)

#### 練習問題

1. `int.TryParse` の成功時と失敗時を確認する。
2. `ref` を使う method を戻り値で書き換える。
3. `in` が必要になりそうな大きな struct の例を調べる。

<a id="ex-5a16dc22e1"></a>
### [Nullable&lt;T&gt;](../06_型システムと言語機能/16_NullableT.md)

#### 練習問題

1. `int?` の `HasValue` と `Value` を確認する。
2. `??` で既定値を設定する。
3. DB の nullable column を C# でどう表すか考える。

<a id="ex-aaf10b3cff"></a>
### [型設計の選び方](../06_型システムと言語機能/17_型設計の選び方.md)

#### 練習問題

1. 商品一覧 API の response を `record` で表す。
2. 注文状態を `enum` で表し、状態ごとの処理が増えたらどう分けるか考える。
3. 金額を `record struct` として表し、異なる通貨を加算できないようにする。

<a id="ex-7a800910ca"></a>
### [Result 型とジェネリック設計](../06_型システムと言語機能/18_Result型とジェネリック設計.md)

#### 練習問題

1. `Result<int>` を返す割引計算 method を作る。
2. `Result<T>` の失敗理由を string ではなく enum にする。
3. Application Service が返した `Result<Order>` を API response に変換する。

<a id="ex-ecf5273924"></a>
### [属性と Reflection の実務利用](../06_型システムと言語機能/19_属性とReflectionの実務利用.md)

#### 練習問題

1. `ExportColumnAttribute` を作り、property に表示名を付ける。
2. reflection で attribute を読み取り、CSV header を作る。
3. 同じ変換を手書き mapping で書き、どちらが読みやすいか比較する。

## 設計と実務パターン

<a id="ex-e3730ae1f7"></a>
### [SOLID 原則](../07_設計と実務パターン/01_SOLID原則.md)

#### 練習問題

1. 1つのクラスに複数責務がある例を分割する。
2. `new` している外部依存を interface 経由にする。
3. 大きな interface を用途別に分ける。

<a id="ex-aa60dca803"></a>
### [例外設計](../07_設計と実務パターン/03_例外設計.md)

#### 練習問題

1. 入力エラーとシステムエラーを分類する。
2. 例外を投げる場所と捕まえる場所を決める。
3. API のエラーレスポンス方針を書く。

<a id="ex-83a76338b8"></a>
### [Factory / Strategy / Adapter](../07_設計と実務パターン/06_FactoryStrategyAdapter.md)

#### 練習問題

1. 支払い方法ごとに Strategy を分ける。
2. 文字列種別から Strategy を選ぶ Factory を作る。
3. 外部 API の戻り値を自社モデルへ変換する Adapter を考える。

<a id="ex-0ddfbde023"></a>
### [レイヤードアーキテクチャ](../07_設計と実務パターン/07_レイヤードアーキテクチャ.md)

#### 練習問題

1. TODO API を層に分けた場合の責務を書く。
2. Controller に書くべきでない処理を列挙する。
3. Infrastructure を差し替え可能にする依存方向を考える。

<a id="ex-5f5f3f60b8"></a>
### [Clean Architecture の入口](../07_設計と実務パターン/08_CleanArchitectureの入口.md)

#### 練習問題

1. Domain が Infrastructure に依存していないか確認する。
2. TODO 作成処理を UseCase として切り出す。
3. DB をメモリ実装に差し替えられる設計を考える。

<a id="ex-a3a11d2ea7"></a>
### [DI コンテナの実装](../07_設計と実務パターン/09_DIコンテナの実装.md)

#### 練習問題

1. `IClock` と `SystemClock` を DI に登録する。
2. `OrderService` を Scoped として登録する。
3. `OrderService` のテスト用に固定時刻を返す `FixedClock` を作る。
4. Singleton から Scoped に依存すると何が問題か説明する。

<a id="ex-1642d432db"></a>
### [設定管理と IOptions](../07_設計と実務パターン/10_IOptionsとConfiguration.md)

#### 練習問題

1. `ExternalApiOptions` を作って `appsettings.json` から bind する。
2. `TimeoutSeconds` が 0 以下なら起動時エラーにする。
3. 環境変数で `ExternalApi__BaseUrl` を上書きする。
4. 秘密情報にすべき設定値を分類する。
5. 環境ごとに変わる値を一覧化する。

<a id="ex-f4c99b6cf1"></a>
### [ログ設計と構造化ログ](../07_設計と実務パターン/04_ログ設計.md)

#### 練習問題

1. `OrderService` に `ILogger<OrderService>` を注入する。
2. 成功ログと失敗ログに `OrderId` を入れる。
3. `BeginScope` で `CorrelationId` を付与する。
4. ログに出してはいけない値を3つ挙げる。

<a id="ex-cd8f9d9268"></a>
### [グローバルエラーハンドリング](../07_設計と実務パターン/12_グローバルエラーハンドリング.md)

#### 練習問題

1. `DomainException` を作り、API 境界で 409 に変換する方針を書く。
2. `ProblemDetails` の response 例を作る。
3. 例外ログに `CorrelationId` を含める。
4. レスポンスに出してはいけない情報を3つ挙げる。

<a id="ex-92a7291076"></a>
### [IHostedService とバックグラウンド処理](../07_設計と実務パターン/13_IHostedServiceとバックグラウンド処理.md)

#### 練習問題

1. 10秒ごとにログを出す `BackgroundService` を作る。
2. `CancellationToken` を `Task.Delay` と下位処理へ渡す。
3. Scoped サービスを使う worker に書き換える。
4. 例外が起きたときに再試行するか停止するか方針を書く。

<a id="ex-c99b88092a"></a>
### [アプリケーションサービスと責務分割](../07_設計と実務パターン/14_アプリケーションサービスと責務分割.md)

#### 練習問題

1. Controller に書かれた注文完了処理を Application Service へ移す。
2. `Order` に状態遷移の method を追加し、外部から `Status` を直接変更できないようにする。
3. Repository に入っている業務判断を Domain または Application Service へ移す。

<a id="ex-cfe896e388"></a>
### [DTO と Domain Model の使い分け](../07_設計と実務パターン/15_DTOとDomainModelの使い分け.md)

#### 練習問題

1. DB Entity をそのまま返している API を Response DTO に変換する。
2. Request DTO から Domain Model を生成する処理を書き、validation の場所を説明する。
3. DTO、Domain Model、EF Core Entity を分けるべきケースと、分けなくてもよいケースを比較する。

<a id="ex-9a0bf0c48f"></a>
### [設計レビュー観点](../07_設計と実務パターン/16_設計レビュー観点.md)

#### 練習問題

1. 既存の Controller を読み、業務判断が書かれている行を探す。
2. API response に Entity をそのまま返していないか確認する。
3. DI の lifetime と constructor の依存数をレビューする。
4. ログに出してよい値と出してはいけない値を分類する。

## テストと品質

<a id="ex-3b0f5bc6b8"></a>
### [テストしやすい設計](../08_テストと品質/04_テストしやすい設計.md)

#### 練習問題

1. 現在時刻に依存する処理を `IClock` 経由にする。
2. ファイル読み込みと計算処理を分ける。
3. Controller から業務ロジックを service に移す。

<a id="ex-00945236ed"></a>
### [静的解析](../08_テストと品質/06_静的解析.md)

#### 練習問題

1. nullable warning を1つ直す。
2. warning を error として扱う設定を調べる。
3. 抑制が必要なケースの理由を書く。

<a id="ex-6f3849a155"></a>
### [コードレビュー観点](../08_テストと品質/07_コードレビュー観点.md)

#### 練習問題

1. 既存記事のコード例をレビュー観点で読み直す。
2. null と例外の扱いを確認する。
3. テストが必要な仕様を3つ挙げる。

<a id="ex-82effd09ba"></a>
### [テストプロジェクト構成](../08_テストと品質/08_テストプロジェクト構成.md)

#### 練習問題

1. `src` と `tests` を分けた solution を作る。
2. test project から本体 project を参照する。
3. 本体に `Calculator` class を作り、xUnit でテストする。
4. solution root で `dotnet test` が通ることを確認する。

<a id="ex-55dd7f3ce5"></a>
### [Moq と NSubstitute](../08_テストと品質/09_MoqとNSubstitute.md)

#### 練習問題

1. `IClock` を Moq または NSubstitute で差し替える。
2. 同じテストを手書き stub で書き換える。
3. どちらが読みやすいか説明する。
4. 呼び出し回数検証が必要な例と不要な例を挙げる。

<a id="ex-5646bb5289"></a>
### [Testcontainers](../08_テストと品質/10_Testcontainers.md)

#### 練習問題

1. PostgreSQL コンテナを起動する fixture を作る。
2. EF Core の `DbContext` に接続文字列を渡す。
3. migration を適用して簡単な CRUD テストを書く。
4. unit test と integration test の実行タイミングを分ける方針を書く。

<a id="ex-ef2570fd06"></a>
### [カバレッジ測定](../08_テストと品質/11_カバレッジ測定.md)

#### 練習問題

1. `dotnet test --collect:"XPlat Code Coverage"` を実行する。
2. HTML レポートを生成する。
3. 未テストの分岐を1つ見つけてテストを追加する。
4. カバレッジ率ではなく、仕様の観点で足りないテストを説明する。

<a id="ex-b99a5a8f99"></a>
### [CI でテストを実行する](../08_テストと品質/12_CIでテストを実行する.md)

#### 練習問題

1. `.github/workflows/test.yml` の workflow を書く。
2. `dotnet restore`, `dotnet build`, `dotnet test` を分ける。
3. test 失敗時のログから原因を読み取る。
4. coverage 収集を有効にする。

<a id="ex-195b24a4ad"></a>
### [テスト戦略](../08_テストと品質/13_テスト戦略.md)

#### 練習問題

1. 既存の test を Unit / Integration / E2E に分類する。
2. DB を使う test を Testcontainers へ寄せるべきか判断する。
3. flaky になりそうな時刻依存 test を `TimeProvider` で直す。

<a id="ex-29cc833012"></a>
### [境界値と例外のテスト](../08_テストと品質/14_境界値と例外のテスト.md)

#### 練習問題

1. 数量が `1` 以上であることを、`0`、`1`、`2` でテストする。
2. 文字列長の上限ちょうどと上限超えをテストする。
3. `ArgumentOutOfRangeException` の parameter 名を確認する。
4. Web API の validation error を `400` と `ProblemDetails` で確認する。

<a id="ex-9e0edbf7c1"></a>
### [非同期処理のテスト](../08_テストと品質/15_非同期処理のテスト.md)

#### 練習問題

1. `async Task` の test method を作る。
2. 非同期 method の例外を `Assert.ThrowsAsync` で確認する。
3. `CancellationToken` がキャンセル済みのときの動作をテストする。
4. `await` を外した悪いテストがなぜ危険か説明する。

<a id="ex-cb29475bf4"></a>
### [テストデータ管理](../08_テストと品質/16_テストデータ管理.md)

#### 練習問題

1. `ProductBuilder` を作り、在庫だけを変えたテストを書く。
2. null、空文字、最大値などのテストデータを builder で表現する。
3. DB を使うテストで、各テストのデータを一意にする方法を考える。
4. 共有 fixture に置いてよいものと、各テストで作るべきものを分類する。

<a id="ex-3af00e2c69"></a>
### [flaky test 対策](../08_テストと品質/17_flaky test対策.md)

#### 練習問題

1. `Task.Delay` に依存するテストを、完了 `Task` を待つ形に直す。
2. 現在時刻に依存するテストを固定時刻にする。
3. 共有 DB の固定 ID を一意値に変える。
4. flaky test の原因分類メモを作る。

<a id="ex-baa3f66f95"></a>
### [品質ゲートと PR チェック](../08_テストと品質/18_品質ゲートとPRチェック.md)

#### 練習問題

1. PR 前に実行するローカル確認コマンドを README に書く。
2. `dotnet format --verify-no-changes` を CI に追加する。
3. 自分の project 用の PR checklist を作る。
4. coverage の数字ではなく、重要な分岐がテストされているか確認する。

## データアクセス

<a id="ex-fe465c2c99"></a>
### [Transaction](../09_データアクセス/06_Transaction.md)

#### 練習問題

1. 2つの更新が片方だけ成功すると困る例を挙げる。
2. トランザクション境界をどこに置くか考える。
3. 外部 API と DB 更新の整合性問題を調べる。

<a id="ex-8dae77f0e8"></a>
### [Change Tracker と Loading Strategy](../09_データアクセス/12_ChangeTrackerとLoadingStrategy.md)

#### 練習問題

1. 一覧取得 query に `AsNoTracking()` を付ける。
2. `Include` と projection の SQL の違いを確認する。
3. 更新処理で tracking が必要な理由を説明する。

<a id="ex-413da033a5"></a>
### [EF Core 診断](../09_データアクセス/13_EFCore診断.md)

#### 練習問題

1. 既存 query に `ToQueryString()` を付けて SQL を確認する。
2. `Select` で必要な列だけ取得する形に変える。
3. 検索条件に対応する index があるか確認する。

<a id="ex-33d837efda"></a>
### [EF Core と Dapper と ADO.NET の判断](../09_データアクセス/14_EFCoreとDapperとADONETの判断.md)

#### 練習問題

1. EF Core の query と同じ条件を Dapper SQL で書く。
2. どちらが読みやすいか、変更に強いかを比較する。
3. 自分のプロジェクトならどこに SQL を置くか決める。

<a id="ex-e4f580c9e3"></a>
### [EF Core パフォーマンス診断](../09_データアクセス/15_EFCoreパフォーマンス診断.md)

#### 練習問題

1. `ToQueryString()` で生成 SQL を表示する。
2. `AsNoTracking()` あり、なしの違いを説明する。
3. 一覧 API の query を response DTO への projection に変える。
4. `Include` が必要な query と不要な query を分類する。

<a id="ex-897b641bbf"></a>
### [Raw SQL と Dapper 併用](../09_データアクセス/16_RawSQLとDapper併用.md)

#### 練習問題

1. LINQ で書ける query と Raw SQL にしたい query を分類する。
2. Dapper の parameter 化 query を書く。
3. SQL injection が起きる悪い文字列連結例を修正する。
4. EF Core と Dapper を同じ transaction で使う場面を説明する。

<a id="ex-01702d78a5"></a>
### [DB 製品差分](../09_データアクセス/17_DB製品差分.md)

#### 練習問題

1. SQL Server、PostgreSQL、SQLite の connection string の違いを説明する。
2. provider 切り替え時に必要な NuGet package を調べる。
3. SQLite では見つけにくい本番 DB 差分を3つ挙げる。
4. 本番に近い DB で integration test すべき処理を分類する。

<a id="ex-214b306970"></a>
### [複数 DbContext と Read / Write 分離](../09_データアクセス/18_複数DbContextとReadWrite分離.md)

#### 練習問題

1. DbContext を分けるべき兆候を3つ挙げる。
2. 読み取り専用 view を EF Core に mapping する。
3. read / write 分離で起きる整合性の問題を説明する。
4. migration を context ごとに分ける手順を調べる。

## Web と API

<a id="ex-f596aa169a"></a>
### [CORS](../10_WebとAPI/13_CORS.md)

#### 練習問題

1. 開発用 origin と本番用 origin を分けて設定する。
2. preflight request が発生する条件を調べる。
3. 認証 cookie を送る場合の CORS 設定を確認する。

<a id="ex-7ff594acdb"></a>
### [Rate Limiting と Caching](../10_WebとAPI/14_RateLimitingとCaching.md)

#### 練習問題

1. search endpoint に rate limiting policy を付ける。
2. catalog endpoint に `Cache-Control` を付ける。
3. cache してよい response としてはいけない response を分類する。

<a id="ex-9f641a6da3"></a>
### [CRUD API の実装パターン](../10_WebとAPI/15_CRUD APIの実装パターン.md)

#### 練習問題

1. `GET /products/{id}` と `POST /products` を実装する。
2. `POST` 成功時に `201 Created` と response DTO を返す。
3. 価格が負数のとき `400 Bad Request` を返す。
4. 存在しない ID の更新と削除で `404 Not Found` を返す。

<a id="ex-d4c5560173"></a>
### [Minimal API と Controller の選び方](../10_WebとAPI/16_MinimalAPIとControllerの選び方.md)

#### 練習問題

1. 同じ `GET /products/{id}` を Minimal API と Controller で書き比べる。
2. `IProductService` を使う形にして、業務処理を endpoint から分離する。
3. endpoint が10個以上になる想定で、どちらが読みやすいか比較する。

<a id="ex-0f2cd08568"></a>
### [Status Code と ProblemDetails](../10_WebとAPI/17_StatusCodeとProblemDetails.md)

#### 練習問題

1. 必須入力不足を `ProblemDetails` の `400` で返す。
2. resource が見つからない場合に `404` を返す。
3. 重複登録を `409` で返す。
4. 認証失敗と権限不足の response を分ける。

<a id="ex-43ad49d107"></a>
### [一覧 API のページング検索ソート](../10_WebとAPI/18_一覧APIのページング検索ソート.md)

#### 練習問題

1. `page` と `pageSize` を query parameter で受け取る。
2. `pageSize` の最大値を 100 に制限する。
3. `sort` の許可項目を `name` と `createdAt` に限定する。
4. `items` と `totalCount` を含む response を返す。

<a id="ex-52aa32cc02"></a>
### [OpenAPI](../10_WebとAPI/08_OpenAPI.md)

#### 練習問題

1. `GET /products/{id}` に `200`、`404`、`500` の response metadata を付ける。
2. `POST /products` に request body と `201` response を明示する。
3. 認証が必要な endpoint を OpenAPI 上で分かるようにする。
4. Development 以外では OpenAPI endpoint を公開しない設定にする。

<a id="ex-16d3f96749"></a>
### [外部 API 連携](../10_WebとAPI/12_外部API連携.md)

#### 練習問題

1. `WeatherApiOptions` を作成し、configuration から読み込む。
2. typed client を `AddHttpClient` で登録する。
3. `404` と `5xx` で扱いを分ける。
4. 外部 response DTO を内部 model に mapping する。

<a id="ex-191e421970"></a>
### [Web API 統合テスト](../10_WebとAPI/21_WebAPI統合テスト.md)

#### 練習問題

1. `GET /products/{id}` の `404` を統合テストで確認する。
2. `POST /products` の `201` と response body を確認する。
3. validation error の `ProblemDetails` を確認する。
4. test 用 service に差し替えて外部依存をなくす。

## ツールと運用

<a id="ex-f3e03ecbd4"></a>
### [release と versioning](../11_ツールと運用/07_releaseとversioning.md)

#### 練習問題

1. 変更を breaking / feature / fix に分類する。
2. リリースノートのテンプレートを作る。
3. API の v1 から v2 への移行方針を考える。

<a id="ex-1fa8034ee3"></a>
### [デプロイ失敗時の診断](../11_ツールと運用/12_デプロイ失敗時の診断.md)

#### 練習問題

1. CI の失敗を build、test、deploy のどれかに分類する。
2. Docker container の log を確認する command を実行する。
3. 必須設定が空のときに起動失敗させる check を追加する。
4. rollback する条件と再デプロイする条件を文章にする。

## 実践プロジェクト

<a id="ex-a93463baab"></a>
### [コンソール電卓](../12_実践プロジェクト/01_console-calculator.md)

#### 発展課題

1. `decimal.TryParse` を使って入力エラーを表示する。
2. 0 除算を事前にチェックする。
3. 計算処理をメソッドに分ける。
4. xUnit で計算処理のテストを書く。

<a id="ex-c94abfa40e"></a>
### [TODO CLI](../12_実践プロジェクト/02_todo-cli.md)

#### 発展課題

- xUnit でコマンド解析のテストを書く。
- JSON 読み込み失敗時のエラー処理を追加する。
- `--help` を追加する。
- GitHub Actions で `dotnet test` を実行する。

<a id="ex-2a49d58b27"></a>
### [家計簿集計ツール](../12_実践プロジェクト/03_家計簿集計ツール.md)

#### 発展課題

- CSV ファイルから読み込む。
- 集計結果を JSON で出力する。
- テストデータを使って集計ロジックをテストする。

<a id="ex-9573e41fdd"></a>
### [CSV 集計ツール](../12_実践プロジェクト/04_csv集計ツール.md)

#### 発展課題

- CsvHelper などのライブラリを調べる。
- 大きなファイルを全件メモリに載せず処理する。
- 集計結果を別ファイルに出力する。

<a id="ex-8956fb9b7a"></a>
### [TODO Web API](../12_実践プロジェクト/05_todo-web-api.md)

#### 発展課題

- xUnit で service のテストを書く。
- 入力エラーを ProblemDetails で返す。
- メモリ保存から DB 保存へ移行する。
- バックグラウンド処理で期限切れ TODO を整理する設計を考える。

<a id="ex-925243c801"></a>
### [DB 付き CRUD アプリ](../12_実践プロジェクト/06_db付きcrudアプリ.md)

#### 発展課題

- Repository を導入するか判断する。
- projection で response DTO を返す。
- GitHub Actions でテストを自動化する。
- [EF Core パフォーマンス診断](../09_データアクセス/15_EFCoreパフォーマンス診断.md) の観点で query を見直す。

<a id="ex-1244933f7d"></a>
### [認証付きメモ API](../12_実践プロジェクト/07_認証付きメモapi.md)

#### 発展課題

- refresh token やログアウトを調べる。
- rate limit を追加する。
- API テストを追加する。
- [Authentication / Authorization](../10_WebとAPI/07_AuthenticationAuthorization.md) と [Rate Limiting と Caching](../10_WebとAPI/14_RateLimitingとCaching.md) を読み、攻撃対策を追加する。

<a id="ex-1ad0b4959f"></a>
### [実務ミニ案件チェックリスト](../12_実践プロジェクト/08_実務ミニ案件チェックリスト.md)

#### 発展課題

- CI で build/test を実行する。
- Docker で DB を起動する。
- OpenAPI を更新する。
- release note を書く。
- PR template を作る。
- review 指摘を分類して再発防止メモにする。
- release note を PR から作る。
- Docker Compose で依存サービスを起動する。
- GitHub Actions で build/test/format を実行する。
- OpenAPI とサンプル request を整える。

## ランタイムと高度な C#

<a id="ex-710db45e25"></a>
### [CLR とマネージコード](../13_ランタイムと高度なCSharp/01_CLRとマネージコード.md)

#### 練習問題

1. `dotnet --info` と runtime 情報出力を見比べる。
2. SDK と runtime の違いを説明する。
3. managed code と unmanaged resource の違いを調べる。

<a id="ex-ebaba254c2"></a>
### [GC とオブジェクト寿命](../13_ランタイムと高度なCSharp/02_GCとオブジェクト寿命.md)

#### 練習問題

1. 大量の object を作って `GC.GetTotalMemory` を確認する。
2. static list に保持した場合と保持しない場合を比較する。
3. `IDisposable` が必要な resource と GC が扱う memory の違いを説明する。

<a id="ex-5df1024b4b"></a>
### [ファイナライゼーション](../13_ランタイムと高度なCSharp/03_ファイナライゼーション.md)

#### 練習問題

1. `IDisposable` のみで十分な class の例を考える。
2. finalizer が必要になり得る class の例を調べる。
3. `GC.SuppressFinalize` の役割を説明する。

<a id="ex-cbca39851a"></a>
### [ボックス化と値型](../13_ランタイムと高度なCSharp/04_ボックス化と値型.md)

#### 練習問題

1. `int` を `object` に代入する。
2. `List<int>` と `ArrayList` の違いを調べる。
3. interface 経由で struct を扱う場合の boxing 可能性を調べる。

<a id="ex-b2b7d33262"></a>
### [アセンブリとメタデータ](../13_ランタイムと高度なCSharp/05_アセンブリとメタデータ.md)

#### 練習問題

1. 自分の console app の assembly 名を出力する。
2. `typeof(List<>).Assembly` を確認する。
3. `dotnet list package` と assembly の違いを説明する。

<a id="ex-7e1eb8e619"></a>
### [AssemblyLoadContext とプラグイン](../13_ランタイムと高度なCSharp/06_AssemblyLoadContextとプラグイン.md)

#### 練習問題

1. `AssemblyLoadContext.Default` の意味を調べる。
2. unload 可能な context が回収されない原因を調べる。
3. plugin を interface 経由で呼ぶ設計を考える。
4. plugin の依存 assembly が見つからないときの調査手順を説明する。

<a id="ex-d5dd37e661"></a>
### [Span と Memory](../13_ランタイムと高度なCSharp/07_SpanとMemory.md)

#### 練習問題

1. 日付文字列を `ReadOnlySpan<char>` で分割する。
2. `Substring` と `AsSpan` の違いを調べる。
3. `Memory<T>` が必要になる場面を調べる。

<a id="ex-58a6013842"></a>
### [ReadOnlySequence と Pipelines](../13_ランタイムと高度なCSharp/08_ReadOnlySequenceとPipelines.md)

#### 練習問題

1. byte array から `ReadOnlySequence<byte>` を作る。
2. segment を列挙して値を出力する。
3. `Stream`、`Span<T>`、`PipeReader` の使い分けを説明する。

## 参考資料

<a id="ex-5e30c08d1a"></a>
### [18章アウトライン対応表](../99_参考資料/08_18章アウトライン対応表.md)

#### 練習問題

1. 現在の自分が説明できない章を 3 つ選ぶ。
2. その章に対応する既存記事を読み、未対応なら追加したい記事名を考える。
3. 「すぐ実務で使う」「レビューで必要」「性能調査で必要」「今は不要」の 4 段階で優先度を付ける。
