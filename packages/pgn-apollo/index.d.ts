/**
 * @desc pgn-logger 对外输出api接口定义
 * @author heyanqiu@yzw.cn
 * @date 2019-12-25
 */
import Koa from 'koa';

export declare function apollo(packageName: string): Koa.Middleware;

export default apollo;

export declare global {
  namespace NodeJS {
      interface Global {
        apolloConfig: Object
      }
  }
}