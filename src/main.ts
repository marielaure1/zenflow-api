import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';
import settings from "@constants/settings";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(bodyParser.json());

  const config = new DocumentBuilder()
    .setTitle('Api ZenFlow')
    .setDescription('Api for a CRM/Forum application with modules.')
    .setVersion('1.0.0')
    .addTag('ZenFlow')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.setGlobalPrefix('api');
  SwaggerModule.setup('api', app, document);

    // Export as JSON
    fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

    // Export as YAML
    fs.writeFileSync('./swagger.yaml', yaml.dump(document));

    
  await app.listen(settings.PORT, () => console.log(settings.PORT));
}
bootstrap();