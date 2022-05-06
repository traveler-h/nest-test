import { UsersService } from './users.service';
import { usersController } from './users.controller';
import { Module } from '@nestjs/common';

@Module({ controllers: [usersController], providers: [UsersService] })
export class UsersModule {}
