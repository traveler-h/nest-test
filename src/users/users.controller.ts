import { Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class usersController {
  // 路由通配符 *表示匹配任意字符： @Get(ab*cd)
  @Get('/findAll')
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Post('/addOne')
  @HttpCode(204)
  create(): string {
    return 'This action adds a new cat';
  }
}
