import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';
import { LogLevels } from './logger/enum/logger.enum';
import { LoggingService } from './logger/logger.service';
import { AllExceptionsFilter } from './utils/filter/allExceptionsFilter';

const PORT = Number(process.env.PORT) || 4000;
const LOG_LEVEL = Number(process.env.LOGGER_LEVEL) || 2;
const LOGGER_LEVEL = [Object.values(LogLevels)[LOG_LEVEL]];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = new DocumentBuilder()
    .setTitle('Home-Library')
    .setDescription('REST API')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        bearerFormat: 'JWT',
      },
      'Bearer',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc', app, document);

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
