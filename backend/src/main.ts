import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Lê a porta das variáveis de ambiente (8080 no seu .env) ou usa 4000 como fallback.
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
