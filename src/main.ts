import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';
import settings from "@constants/settings";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Api ZenFlow')
    .setDescription('Api for a CRM/Forum application with modules.')
    .setVersion('1.0.0')
    .addTag('ZenFlow')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.setGlobalPrefix('api');
  SwaggerModule.setup('api', app, document);

  await app.listen(settings.PORT, () => console.log(settings.PORT));
}
bootstrap();