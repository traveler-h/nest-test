import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: '张三',
      age: '28',
      job: '教师',
      hobbies: ['羽毛球', '乒乓球', '足球'],
    },
    {
      id: 2,
      name: '张四',
      age: '29',
      job: '教师',
      hobbies: ['网球', '篮球', '骑马'],
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const one = this.users.find((item) => item.id === +id);
    if (!one) {
      throw new NotFoundException('This user not found');
      // throw new HttpException('This user not found', HttpStatus.NOT_FOUND);
    }
    return one;
  }

  create(CreateUserDto: CreateUserDto) {
    this.users.push(CreateUserDto);
    return CreateUserDto;
  }

  update(id: string, UpdateUserDto: any) {
    const exitCurrentUser = this.findOne(id);
    if (exitCurrentUser) {
      this.users.splice(
        this.users.findIndex((item) => item.id === 2),
        1,
        { ...UpdateUserDto },
      );
      return UpdateUserDto;
    }
    return '查无此人';
  }

  delete(id: string) {
    const currentIndex = this.users.findIndex((item) => item.id === +id);
    if (currentIndex >= 0) {
      this.users.splice(currentIndex, 1);
    }
  }
}
