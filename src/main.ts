import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GoogleAuthInterceptor } from './interceptors/googleAuth.interceptor';
import { HttpService } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new GoogleAuthInterceptor(new HttpService()));
  await app.listen(4000);
}
bootstrap();
