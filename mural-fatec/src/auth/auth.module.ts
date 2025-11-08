import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { Aluno } from 'src/aluno/entity/aluno.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AlunoModule } from 'src/aluno/aluno.module';

@Module({
  imports:[
    ConfigModule,
    PassportModule,
    AlunoModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {expiresIn: '1h'},
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}