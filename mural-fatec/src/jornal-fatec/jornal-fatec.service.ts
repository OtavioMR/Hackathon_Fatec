import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JornalFatec } from './entity/jornalFatec.entity';
import { Repository } from 'typeorm';
import { CreateJornalDto } from './dto/create-jornal.dto';
import { Aluno } from 'src/aluno/entity/aluno.entity';

@Injectable()
export class JornalFatecService {
    constructor(
        @InjectRepository(JornalFatec)
        private readonly jornalRepository: Repository<JornalFatec>,

        @InjectRepository(Aluno)
        private readonly alunoRepository: Repository<Aluno>,
    ) { }

    async create(dto: CreateJornalDto) {
        // 1️⃣ Buscar o aluno que vai ser dono da postagem
        const aluno = await this.alunoRepository.findOne({ where: { id: dto.alunoId } });
        if (!aluno) {
            throw new NotFoundException('Aluno não encontrado');
        }

        // 2️⃣ Criar a postagem (objeto simples, não array)
        const postagem = this.jornalRepository.create({
            mensagem: dto.mensagem,
            arquivo: dto.arquivo ?? "",
            foto: dto.foto ?? "",
            aluno: aluno,
        });

        // 3️⃣ Salvar no banco
        return await this.jornalRepository.save(postagem);
    }

    // jornal-fatec.service.ts
    async findAll(): Promise<JornalFatec[]> {
        return await this.jornalRepository.find();
    }

}