import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sugestoes } from './entity/sugestoes.entity';
import { Aluno } from 'src/aluno/entity/aluno.entity';
import { CreateSugestaoDto } from './dto/create-sugestao.dto';


@Injectable()
export class SugestoesService {
    constructor(
        @InjectRepository(Sugestoes)
        private readonly sugestaoRepository: Repository<Sugestoes>,

        @InjectRepository(Aluno)
        private readonly alunoRepository: Repository<Aluno>,
    ) { }

    async create(dto: CreateSugestaoDto, alunoId: number, filePath: string | null) {
        const aluno = await this.alunoRepository.findOne({ where: { id: alunoId } });
        if (!aluno) {
            throw new NotFoundException('Aluno não encontrado');
        }

        const arquivoUrl = filePath
            ? `http://localhost:3000/${filePath.replace(/\\/g, '/')}`
            : null;

        const sugestao = this.sugestaoRepository.create({
            mensagem: dto.mensagem,
            arquivo: arquivoUrl,
            aluno: aluno,
        });

        return await this.sugestaoRepository.save(sugestao);

    }

    async findAll() {
        return await this.sugestaoRepository.find();
    }
}
