import { Module } from '@nestjs/common';
import { ReclameAquiController } from './reclame-aqui.controller';
import { ReclameAquiService } from './reclame-aqui.service';
import { Aluno } from 'src/aluno/entity/aluno.entity';
import { ReclameAqui } from './entity/reclameAqui.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno, ReclameAqui]),
  ],
  controllers: [ReclameAquiController],
  providers: [ReclameAquiService],
  exports: [ReclameAquiService],
})
export class ReclameAquiModule {}
