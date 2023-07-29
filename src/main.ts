import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';

const PORT = Number(process.env.PORT || 4000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home library service')
    .setVersion('1.0')
    .addTag('user')
    .addTag('track')
    .addTag('album')
    .addTag('artist')
    .addTag('favorite')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
  console.log(`Server started on port ${PORT}`);
}
bootstrap();
