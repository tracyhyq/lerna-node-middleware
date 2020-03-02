import Koa from 'koa';

export declare function format(packageName: string): Koa.Middleware;

declare module 'koa' {
  interface ExtendableContext {
    logger: any
  }
}

export default format;