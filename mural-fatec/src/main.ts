import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🔥 Torna a pasta "uploads" acessível publicamente
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Agora as imagens ficam acessíveis via /uploads/...
  });

  // 🧩 Configuração do CORS
  app.enableCors({
    origin: 'http://localhost:8081',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  await app.listen(3000);
  console.log('🚀 Aplicação rodando em http://localhost:3000');
}
bootstrap();
