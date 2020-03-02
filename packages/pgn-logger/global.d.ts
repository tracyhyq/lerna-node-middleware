/*
 * @description: 全局的属性声明
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2019-08-21 16:24:17
 */

import { ExtendableContext } from 'koa';
import { IAppLogger } from './lib/logger';

/**
 * @name: 重新定义koa，将logger加入到Context里面
 * @param {type}
 * @return:
 */

declare module 'koa' {
  interface ExtendableContext {
    logger: IAppLogger;
    // traceId 用于日志追踪
    traceId?: string;
    startTime?: number;
    // 用户ID
    userId?: string | number;
  }
}
