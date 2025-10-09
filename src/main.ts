import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

async function bootstrap() {
  const env = dotenv.config({ path: '.env' });
  dotenvExpand.expand(env);
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // 필요하면 배열 가능: ['http://localhost:5173']
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 쿠키 쓰면 true, 아니면 없어도 됨
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
