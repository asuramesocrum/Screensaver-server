import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())
  app.enableCors()
  app.setGlobalPrefix('api')

  await app.listen(PORT, () => console.log(` server started on port = ${PORT}`));
}
bootstrap();
