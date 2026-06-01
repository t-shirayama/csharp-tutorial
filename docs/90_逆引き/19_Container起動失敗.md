# Container 起動失敗

## 症状

Docker image は build できるが、container がすぐ終了する、port に接続できない、または health check が失敗する。

## 主な原因

- アプリが listen している port と `docker run -p` の port が違う。
- `ASPNETCORE_URLS` や `ASPNETCORE_HTTP_PORTS` が想定と違う。
- 必須 environment variable や secret がない。
- working directory、entrypoint、publish output の path がずれている。
- DB や外部 API へ container から接続できない。

## 確認コマンド

```powershell
docker ps -a
docker logs <container-id>
docker inspect <container-id>
docker run --rm -it --entrypoint sh app:local
```

## port の確認例

```powershell
docker run --rm -p 8080:8080 `
  --env ASPNETCORE_HTTP_PORTS=8080 `
  app:local
```

## 解決手順

1. `docker ps -a` で終了 status を見る。
2. `docker logs` でアプリの起動例外を読む。
3. `docker inspect` で env、port、entrypoint を確認する。
4. container 内に入って publish output と設定ファイルの有無を見る。
5. DB 接続先が `localhost` になっていないか確認する。

## よくあるミス

- host の `localhost` と container 内の `localhost` を同じ意味で扱う。
- Dockerfile の `EXPOSE` だけで port 公開されたと思う。
- `appsettings.Production.json` が image に入っている前提にする。
- 起動直後に落ちているのに network の問題だと決めつける。

## 関連リンク

- [Docker](../11_ツールと運用/06_Docker.md)
- [デプロイ失敗時の診断](../11_ツールと運用/12_デプロイ失敗時の診断.md)
- [設定管理と IOptions](../07_設計と実務パターン/10_IOptionsとConfiguration.md)
