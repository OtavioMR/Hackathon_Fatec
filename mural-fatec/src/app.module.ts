import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AlunoModule } from './aluno/aluno.module';
import { JornalFatecModule } from './jornal-fatec/jornal-fatec.module';
import { ReclameAquiModule } from './reclame-aqui/reclame-aqui.module';
import { SugestoesModule } from './sugestoes/sugestoes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Logs temporários para testar se as variáveis do .env estão sendo lidas
    (() => {
      console.log('DB_HOST:', process.env.DB_HOST);
      console.log('DB_PORT:', process.env.DB_PORT);
      console.log('DB_USERNAME:', process.env.DB_USERNAME);
      console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
      console.log('DB_DATABASE:', process.env.DB_DATABASE);
      return TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // só para dev
      });
    })(),

    AlunoModule,

    JornalFatecModule,

    ReclameAquiModule,

    SugestoesModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
