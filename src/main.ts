import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';
import settings from "@constants/settings";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(settings.PORT);
}
bootstrap();
