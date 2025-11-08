import { Aluno } from "src/aluno/entity/aluno.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Sugestoes')
export class Sugestoes{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mensagem: string;

    @Column({nullable: true})
    arquivo: string;

    @ManyToOne(() => Aluno, (aluno) => aluno.sugestoes, {eager: true})
    @JoinColumn({ name: 'aluno_id'})
    aluno: Aluno;
}