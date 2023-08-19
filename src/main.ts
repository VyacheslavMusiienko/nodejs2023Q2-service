import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { AppModule } from './app.module';
import * as yaml from 'js-yaml';
import { ValidationPipe } from '@nestjs/common';

const PORT = Number(process.env.PORT || 4000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const yamlData = await readFile(
    join(process.cwd(), './src/doc/api.yaml'),
    'utf-8',
  );
  const document = yaml.load(yamlData) as OpenAPIObject | (() => OpenAPIObject);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
  console.log(`Server started on port ${PORT}`);
}
bootstrap();
