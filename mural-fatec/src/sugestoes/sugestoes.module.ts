import { Module } from '@nestjs/common';
import { SugestoesController } from './sugestoes.controller';
import { SugestoesService } from './sugestoes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from 'src/aluno/entity/aluno.entity';
import { Sugestoes } from './entity/sugestoes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno, Sugestoes])],
  controllers: [SugestoesController],
  providers: [SugestoesService],
  exports: [SugestoesService],
})
export class SugestoesModule {}
