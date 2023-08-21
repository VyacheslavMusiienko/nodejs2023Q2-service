import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { AppModule } from './app.module';
import { LogLevels } from './logger/enum/logger.enum';
import { LoggingService } from './logger/logger.service';
import { AllExceptionsFilter } from './utils/filter/allExceptionsFilter';

const PORT = Number(process.env.PORT) || 4000;
const LOG_LEVEL = Number(process.env.LOGGER_LEVEL) || 2;
const LOGGER_LEVEL = [Object.values(LogLevels)[LOG_LEVEL]];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const yamlData = await readFile(
    join(process.cwd(), './src/doc/api.yaml'),
    'utf-8',
  );
  const document = yaml.load(yamlData) as OpenAPIObject | (() => OpenAPIObject);
  SwaggerModule.setup('doc', app, document);

  const logger = app.get(LoggingService);
  app.useLogger(logger);
  app.useLogger(LOGGER_LEVEL);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(logger, httpAdapterHost));

  process.on('unhandledRejection', async (err) => {
    await logger.error(`Unhandled Rejection ${err}`);
  });

  process.on('uncaughtException', async (err) => {
    await logger.error(`Uncaught Exception ${err.name} ${err.message}`);
    process.exit(1);
  });

  await app.listen(PORT);

  await logger.debug(`Application is running on port: ${PORT}`, bootstrap.name);
}
bootstrap();
