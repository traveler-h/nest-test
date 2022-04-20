// 应用程序的根模块
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { usersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [AppController, usersController],
  providers: [AppService],
})
export class AppModule {}
