# 前端团队nodejs公共模块仓库

> 使用lerna包管理工具统一管理

## 1、项目说明

### 1.1、项目目录结构

项目结构：
```txt
├── DEVELOP.md  // 开发配置文档
├── README.md   // 项目介绍
├── lerna.json  // lerna配置文件
├── package-lock.json
├── package.json 
├── packages  // 模块目录文件件，所有模块都放在apckages下
|  ├── pgn-logger   // 日志打印中间件
|  |  ├── README.md   // 模块介绍
|  |  ├── global.d.ts   // typescript声明文件
|  |  ├── index.d.ts  // typescript声明文件
|  |  ├── index.ts  // 模块入口文件
|  |  ├── lib  // 模块开发依赖文件
|  |  |  ├── baseLogger.ts
|  |  |  ├── logger.ts
|  |  |  ├── types.ts
|  |  |  └── util.ts
|  |  ├── package-lock.json
|  |  └── package.json
|  └── pgn-response-fomatter  // 响应请求格式化模块
|     ├── index.d.ts  // typescript声明文件
|     ├── index.ts // 模块入口文件
|     ├── package-lock.json
|     └── package.json
└── tsconfig.json   // 全局typescript编译配置
```

### 1.2、模块包管理

> 每个模块都有单独的```package.json```文件来管理自己的依赖包。

### 1.2.1、模块命名

> 模块发布到npm之后，使用的是```package.json```中name属性来确定包名。

为了方便开发调试及代码分析，所有的模块名需要发布到@fe分组下。
所以模块命名的统一格式是：@fe/[模块名]

```json
  "name": "@fe/pgn-logger"
```

### 1.2.2、模块安装依赖包

本项目使用```lerna```管理，所以可以使用```lerna```命令来安装依赖包

```javascript

  // 全局安装，packages下每个模块，都会安装指定依赖包到```package.json```文件的dependencies中
  lerna add [依赖包]

  // 安装到devDependencies中
  lerna add [依赖包] --dev

  // 安装到单个模块项目中
  lerna add [依赖包] --scope [模块名]

```

由于每个模块都有单独的```package.json```，所有也可以使用npm来安装依赖, 

或者使用lerna，lerna exec 在每个包目录下执行任意命令

```javascript

// cd到 packages/* 模块目录下，执行npm
npm install [依赖包]

//  使用lerna, lerna exec 在每个包目录下执行任意命令
lerna exec -- npm install [依赖包]

```

### 1.2.3、模块编译

> 模块默认都是使用```typescript```开发，开发完成之后需要编译成指定版本的js文件。

全局安装```typescript```

```javascript
  
  // 为所有模块添加typescript依赖
  lerna add typescript

```

定义```package.json```中的```scripts```

```txt
// tsconfig.json为全局的typescript编译配置
"scripts": {
  "compile": "tsc -p ../../tsconfig.json"
}
```
执行 ```npm run compile```会生成每个.ts对应的js文件

### 1.2.4、代码提交

> 当前项目主要都是使用```typescript```开发，并不需要将js文件提交到仓库，提交的时候需要过滤掉所有js文件和其他不需要提交的文件。

项目根目录下，添加有```.gitignore```文件，全局配置了可以提交到git仓库的文件规则。

**注意:** 每次模块发布到npm之前，都需要先将代码提交到仓库。

### 1.2.5、发布白名单

> 当前项目主要都是使用```typescript```开发，开发完成之后会编译成对应版本的js文件，因此真正使用的是js文件，ts开发文件，不需要发布到npm上去。

如果项目```package.json```中配置了，files字段，发布到npm的时候，只会发布files中配置的文件。

例如```pgn-logger```模块中的配置：

```json
"files": [
  "index.js",
  "index.d.ts",
  "global.d.ts",
  "lib/logger.js",
  "lib/types.js",
  "lib/util.js",
  "lib/baseLogger.js"
]
```

如果项目中没有配置files, 发布到npm回去查找```.npmignore```，并过滤掉其中配置的文件，```.npmignore```的规则和```.gitignore```基本上一样。

```
*.diff
*.patch
.svn/
.git/
```

如果项目中没有files，也没有```.npmignore```, 那么发布的时候，会用```.gitignore```文件规则来过滤文件。

### 1.2.6、发布到npm
> 开完完成并并编译之后，我们需要将对应的文件发布到npm，这一个统一使用lerna来完成

完成配置之后，使用```lerna publish```来发布npm到指定的npm源。

当前项目关于lerna的配置，在根目录```lerna.json```中

```txt
{
  "command": {  
    "publish": {  
      "message": "chore(release): publish",
      "registry": "https://registry.npm.taobao.org",  // npm源地址
      "no-verify-access": true
    }
  },
  "packages": [  // 模块所在目录
    "packages/*"
  ],
  "version": "independent"  // 每个模块是否使用独立版本号
}
```

## 2、```lerna```常用命令

详见[lerna常用命令及使用说明](https://www.jianshu.com/p/8b7e6025354b)
