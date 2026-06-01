# release と versioning

## 目的

リリースとバージョン管理の基本を理解し、変更を安全に届けられるようにします。

## 要点

- バージョンは利用者との変更契約です。
- breaking change、feature、bug fix を区別します。
- リリースノートで変更内容と移行手順を残します。
- 注意: breaking change を patch として出さないようにします。
- 注意: リリース内容は Git の差分を見なくても分かる形で残します。
- 注意: rollback 手順を用意してからリリースします。

## 実務での使い方

NuGet パッケージ、API、アプリケーションリリースで使います。API の breaking change はクライアント影響が大きいため、互換性維持や段階移行を考えます。

## 関連リンク

- [Semantic Versioning](https://semver.org/)
