import { Module } from '@nestjs/common';
import { JornalFatecController } from './jornal-fatec.controller';
import { JornalFatecService } from './jornal-fatec.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JornalFatec } from './entity/jornalFatec.entity';
import { Aluno } from 'src/aluno/entity/aluno.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JornalFatec, Aluno]),
  ],
  controllers: [JornalFatecController],
  providers: [JornalFatecService],
  exports: [JornalFatecService],
})
export class JornalFatecModule {}
