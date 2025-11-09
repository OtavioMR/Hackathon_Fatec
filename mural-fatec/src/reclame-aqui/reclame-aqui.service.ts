import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReclameAqui } from './entity/reclameAqui.entity';
import { Repository } from 'typeorm';
import { CreateReclameAquiDto } from './dto/create-reclameAqui.dto';
import { Aluno } from 'src/aluno/entity/aluno.entity';

@Injectable()
export class ReclameAquiService {
    constructor(
        @InjectRepository(ReclameAqui)
        private reclameAquiRepository: Repository<ReclameAqui>,
        @InjectRepository(Aluno)
        private alunoRepository: Repository<Aluno>,
    ){}

    async create(dto: CreateReclameAquiDto, idAluno: number) {
        try {
            // Verificando se o aluno existe
            const aluno = await this.alunoRepository.findOne({ where: { id: idAluno } });
            if (!aluno) {
                throw new NotFoundException('Aluno não encontrado');
            }

            console.log('Aluno encontrado:', aluno);

            // Criando a reclamação
            const reclamacao = this.reclameAquiRepository.create({
                mensagem: dto.mensagem,
                arquivo: dto.arquivo ?? "",
                anonimato: dto.anonimato,
                aluno: aluno,
            });

            console.log('Reclamação sendo salva:', reclamacao);

            // Salvando a reclamação
            return await this.reclameAquiRepository.save(reclamacao);
        } catch (error) {
            console.error('Erro ao criar reclamação:', error);
            // Lançando um erro genérico para capturar qualquer outra falha
            throw new InternalServerErrorException('Erro ao criar a reclamação');
        }
    }

    async findAll() {
        try {
            return await this.reclameAquiRepository.find();
        } catch (error) {
            console.error('Erro ao buscar reclamações:', error);
            throw new InternalServerErrorException('Erro ao buscar as reclamações');
        }
    }
}
