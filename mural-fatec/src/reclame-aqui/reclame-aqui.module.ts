import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

import { ReclameAquiController } from './reclame-aqui.controller';
import { ReclameAquiService } from './reclame-aqui.service';
import { Aluno } from 'src/aluno/entity/aluno.entity';
import { ReclameAqui } from './entity/reclameAqui.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno, ReclameAqui]),

    // 🔹 Configuração para upload de arquivos
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'uploads'), // pasta onde o arquivo será salvo
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + file.originalname;
          cb(null, uniqueSuffix);
        },
      }),
    }),
  ],
  controllers: [ReclameAquiController],
  providers: [ReclameAquiService],
  exports: [ReclameAquiService],
})
export class ReclameAquiModule {}
