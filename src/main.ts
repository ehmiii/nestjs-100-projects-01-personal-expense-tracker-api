import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { Constants } from './common/constants';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(ConfigService).get<string>(Constants.PORT);
  await app.listen(PORT ?? 3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  });
}
bootstrap();
