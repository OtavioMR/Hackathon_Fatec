import { Injectable, NotFoundException } from '@nestjs/common';
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

    async create(dto: CreateReclameAquiDto){
        const aluno = await this.alunoRepository.findOne({where: {id: dto.alunoId}});
        if(!aluno){
            throw new NotFoundException('Aluno não encontrado');
        }

        const reclamacao = this.reclameAquiRepository.create({
            mensagem: dto.mensagem,
            arquivo: dto.arquivo ?? "",
            anonimato: dto.anonimato,
            aluno: aluno,
        });

        return await this.reclameAquiRepository.save(reclamacao);
    }

    async findAll(){
        return await this.reclameAquiRepository.find();
    }
}
