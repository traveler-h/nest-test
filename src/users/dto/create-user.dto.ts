import { IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly age: string;
  @IsString()
  readonly job: string;
  @IsString({ each: true })
  readonly hobbies: string[];
}
