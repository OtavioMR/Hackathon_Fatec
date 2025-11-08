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

    async create(dto: CreateSugestaoDto) {
        const aluno = await this.alunoRepository.findOne({ where: { id: dto.alunoId } });
        if (!aluno) {
            throw new NotFoundException('Aluno não encontrado');
        }

        const reclamacao = this.sugestaoRepository.create({
            mensagem: dto.mensagem,
            arquivo: dto.arquivo ?? "",
            aluno: aluno,
        });

        return await this.sugestaoRepository.save(reclamacao);
    }

    async findAll(){
        return await this.sugestaoRepository.find();
    }
}
