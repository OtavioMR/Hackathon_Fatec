import { JornalFatec } from "src/jornal-fatec/entity/jornalFatec.entity";
import { ReclameAqui } from "src/reclame-aqui/entity/reclameAqui.entity";
import { Sugestoes } from "src/sugestoes/entity/sugestoes.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";

@Entity('Alunos')
export class Aluno{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeCompleto: string;

    @Column({unique: true})
    email: string;

    @Column()
    senha: string;

    @OneToMany(() => JornalFatec, (jornal) => jornal.aluno)
    jornais: JornalFatec[];

    @OneToMany(() => ReclameAqui, (reclameAqui) => reclameAqui.aluno)
    reclameAqui: ReclameAqui[];

    @OneToMany(() => Sugestoes, (sugestoes) => sugestoes.aluno)
    sugestoes: Sugestoes[];

}