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
    ) {}

    // Método para criar uma nova postagem no jornal
    async create(dto: CreateJornalDto, idAluno: number, filePath: string | null, fotoPath: string | null) {
        // Buscar o aluno que vai ser dono da postagem
        const aluno = await this.alunoRepository.findOne({ where: { id: idAluno } });
        if (!aluno) {
            throw new NotFoundException('Aluno não encontrado');
        }

        // Criar a postagem com os caminhos dos arquivos
        const postagem = this.jornalRepository.create({
            titulo: dto.titulo,
            mensagem: dto.mensagem,
            arquivo: filePath || null, // Caminho do arquivo
            foto: fotoPath || null, // Caminho da foto
            aluno: aluno,
        });

        // Salvar a postagem no banco de dados
        return await this.jornalRepository.save(postagem);
    }

    // Método para listar todas as postagens
    async findAll(): Promise<JornalFatec[]> {
        return await this.jornalRepository.find();
    }
}
