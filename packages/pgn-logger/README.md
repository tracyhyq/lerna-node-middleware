# pgn-logger

基于 Koa, winston 的应用日志解决方案

## Usage

### 实例化：

```
  import logger from 'pgn-logger';
  // packageJson 是指package.json 文件，拿到项目名称穿进去生成log日志文件名
  app.use(logger(packageJson.name));
```

### 日志分割

- 默认配置

```
// info 日志默认配置
const DEFAULT_INFO_OPT = {
  filename: 'out-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '1g',
  maxFiles: '15d'
};

// error 日志默认配置
const DEFAULT_ERROR_OPT = {
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '1g',
  maxFiles: '15d'
};
```

- 自定义配置

详细配置：[https://github.com/winstonjs/winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file)

```
  const option = {
    infoOption: {
      maxSize: '100k',
    },
    errorOption: {
      maxSize: '100k'
    },
  };
  const logger = new AppLogger(option);
```

### 使用：
```
  app.use(async (ctx, next) => {
    // stdout
    ctx.logger.info('info %s', message);
    // stdout
    ctx.logger.warn('warn %o', object);
    // stderr
    ctx.logger.error('error message');
    ctx.logger.error(new Error('message'));
    await next();
  });
```

## 日志格式

```
[2019-12-27 17:02:49.096] [info] NODE-LOGGER - [-|::1|6299956784451649670|Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36|4ms GET /api/list/listData 404] [Object: null prototype] {}

// 格式说明
[日期时间] [日志等级] [Appender] - [userId|ip|traceId|Agent|useTime method url] 自定义内容
```
