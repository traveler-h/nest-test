import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@Controller({ host: 'admin.example.com' })
export class usersController {
  constructor(private readonly UsersService: UsersService) {}

  // 路由通配符 *表示匹配任意字符： @Get(ab*cd)
  @Get('/findAll')
  @Header('Cache-Control', 'none') // 定义响应头
  findAll(@Res() response, @Query() paginationQuery): Observable<any[]> {
    const { limit, offset } = paginationQuery;
    return response.status(200).send(this.UsersService.findAll());
  }

  @Get('findOne/:id')
  findOne(@Param('id') id, @Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    // res.status(HttpStatus.OK).json([]);
    //  res.status(HttpStatus.CREATED).send();
    return this.UsersService.findOne(id);
  }

  @Post('/addOne')
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() body: CreateUserDto) {
    return this.UsersService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.UsersService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.UsersService.delete(id);
  }
}
