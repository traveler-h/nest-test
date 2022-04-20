// 应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例。
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
