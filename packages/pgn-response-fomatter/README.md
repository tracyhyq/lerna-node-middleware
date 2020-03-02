# pgn-response-fomatter

传入规则，规则匹配的url请求，都会进行格式检验和转换成约定的格式

## Usage

### 实例化：

```
  import resFormatter from '@fe/pgn-response-fomatter';
  // api开头的url请求，会经过转换
  app.use(resFormatter('^/api'));
```


