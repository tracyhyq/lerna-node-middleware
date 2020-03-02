# pgn-apollo

基于 node-apollo 的接入方案

## 配置
apollo

### 配置说明:

```
  import apollo from '@fe/pgn-apollo';
  apollo({
    time: 30000,  // 间隔时间毫秒数, 不传默认1分钟调一次
    configServerUrl: '',  // 远程apollo配置地址
    appId: '',  // 项目appid
    clusterName: '',  // 集群配置, 不传默认是default
    namespaceName: [],   // 命名空间, 不传默认是['application']
  });
```
### 使用

> pgn-apollo实例化之后，每间隔一段时间，会从远程配置中心拉取配置，然后写到```global.apolloConfig```中

```
  import apollo from '@fe/pgn-apollo';

  await apollo({
    appId: '112233',  // 项目appid
  });

  console.log(global.apolloConfig);

```

