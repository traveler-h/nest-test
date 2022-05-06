# 学习nestjs

### 新建项目

#### 新建项目

```
$ npm i -g @nestjs/cli
$ nest new project-name
```

#### 项目文件分类

 + module 讲整个模块暴露给外界
 + dto 文件夹下存放的是约束数据类型的文件
 + interface 文件夹下创建的是接口约束数据类型
 + schemas 文件夹下创建的是数据建模信息
 + controller 带有单个路由的基本控制器示例
 + providers 注入数据库信息的文件
 + service 带有单个方法的基本服务
 + spec.ts	单元测试样例

### 开发环境启动项目

 + npm run start:dev

### 模块介绍

1. @Controller('user') 装饰器定义一个基本的控制器。可选路由路径前缀
  1. @Get('/findAll') -----对应路由为 /user/findAll
  2. @Post()
  3. @Patch()
  4. @Delete()
2. @Param(key?: string) 将路由参数作为被修饰的方法参数的属性
  1. @Param()
  2. @Param('id')
3. @Body(key?: string) POST 路由处理程序样例中，处理程序没有接受任何客户端参数。通过添加 @Body() 参数来解决这个问题
  1.@Body()
  2.@Body('id')
4. @Query(key?: string) Request 对象代表 HTTP 请求，并具有查询字符串，请求参数参数，HTTP 标头（HTTP header） 和 正文（HTTP body）的属性。使用 @Body() 或 @Query() 获取
  1.@Query()
  2.@Query('id')
5. @Headers(name?: string)    指定自定义响应头
  + req.headers/req.headers[name]


### 错误处理

#### 1. HttpException

内置 HttpException 类，从 @nestjs/common 包中导入。在发生某些错误情况时发送标准HTTP响应对象
```
throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
```
response 参数定义 JSON 响应体。它可以是 string 或 object，如下所述。
status参数定义HTTP状态代码

#### 2. 自定义异常

```
forbidden.exception.ts
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

cats.controller.ts
@Get()
async findAll() {
  throw new ForbiddenException();
}
```

#### 3. 常用内置异常

 + BadRequestException
 + UnauthorizedException
 + NotFoundException
 + ForbiddenException
 + NotAcceptableException
 + RequestTimeoutException
 + ConflictException
 + GoneException
 + PayloadTooLargeException
 + UnsupportedMediaTypeException
 + UnprocessableException
 + InternalServerErrorException
 + NotImplementedException
 + BadGatewayException
 + ServiceUnavailableException
 + GatewayTimeoutException

#### 异常过滤器
所有异常过滤器都应该实现通用的 ExceptionFilter<T> 接口。它需要你使用有效签名提供 catch(exception: T, host: ArgumentsHost)方法。T 表示异常的类型。

需要访问底层平台 Request和 Response。访问Request对象，以便提取原始 url并将其包含在日志信息中。使用 Response.json()方法，使用 Response对象直接控制发送的响应

```
http-exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}


cats.controller.ts

@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}

@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```


#### 全局异常过滤器

```
main.ts

app.useGlobalFilters(new HttpExceptionFilter());
```

注册一个全局范围的过滤器直接为任何模块设置过滤器

```
app.module.ts

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

```

### nest请求生命周期

  1. 收到请求
  2. 全局中间件
  3. 模块中间件
  4. 全局守卫
  5. 控制器守卫
  6. 路由守卫
  7. 全局拦截器
  8. 控制器拦截器
  9. 路由拦截器
  10. 全局管道
  11. 控制器管道
  12. 路由管道
  13. 路由参数管道
  14. Controller(方法处理器)
  15. 服务
  16. 路由拦截器
  17. 控制器拦截器
  18. 全局拦截器
  19. 异常过滤器(路由 - 控制器 - 全局)
  20. 相应数据
