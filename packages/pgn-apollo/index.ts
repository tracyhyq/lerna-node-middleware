/**
* @description: apollo配置接入
* @author Mr.Lee
* @LastEditors Mr.Lee
* @LastEditTime 2020-01-08 11:34:22
**/
///<reference path="./index.d.ts" />

import * as apollo from 'node-apollo';
import * as schedule from 'node-schedule';
const env = process.env.NODE_ENV;

interface Params {
  time?: number
}

// 默认间隔时间(毫秒数), 每分钟
const INTERVAL_TIME = 60000;  

// 默认生产环境配置
const defaultConfig = {
  configServerUrl: '',
  apolloEnv: '',
  clusterName: 'default',
  namespaceName: ['application'],
  token: 'e684c5e28caf6255460883efafdd881141f106ee'   // 前端项fe账户token
}

/**
 * 合并参数
 * 1、根据环境变量修改默认配置
 * 2、默认配置与自定义配置合并
 * @param config 传入配置
 */
function getConfig(config: Params) {
  // 开发环境变量
  if (env === 'dev' || env === 'development') {
    defaultConfig.apolloEnv = 'DEV';
    defaultConfig.configServerUrl = 'http://192.168.1.4:8070';
  } else if (env === 'test') {
    defaultConfig.apolloEnv = 'TEST';
    defaultConfig.configServerUrl = 'http://192.168.1.4:8070';
  }
  return {...defaultConfig, ...config};
}

/**
 * 获取apollo配置数据
 * @param config 请求apollo参数
 */
async function queryConfigData(config: Params) {
  try {
    return await apollo.remoteConfigService(config);
  } catch(e) {
    console.log(e);
  }
  return {};
}

function getInterval(time: number) {
  time = time / 1000;
  const arr = (new Array(60).fill(0)).map((item, index) => item || index);
  const rule = new schedule.RecurrenceRule();
  if (time < 60) {  // 1分钟内, 每隔time秒触发一次
    rule.second = arr.filter(item => item % time === 0);
    return rule;
  } else if (time >= 60 && time < 3600) { // 1小时内
    time = time / 60;
    rule.minute = arr.filter(item => item % time === 0);
    return rule;
  } else if (time >= 3600 && time < 86400) { // 1天内
    time = time / 3600;
    rule.hour = arr.filter(item => item % time === 0);
    return rule;
  } else {  // 其他情况默认每天晚上23:59:59执行
    return '59 59 23 * * *';
  }
}

export default async (config: Params) => {
  // 分离time参数设置
  let {time, ...otherConfig} = config;
  // 获取合并之后的配置
  config = getConfig(otherConfig);
  // 获取配置
  global.apolloConfig = await queryConfigData(config);
  // 每隔一段时间请求一次
  schedule.scheduleJob(getInterval(time || INTERVAL_TIME), async () => {
    global.apolloConfig = await queryConfigData(config);
    console.log('当前配置:', global.apolloConfig);
  });
}