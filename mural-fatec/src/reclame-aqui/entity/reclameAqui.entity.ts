import { Aluno } from "src/aluno/entity/aluno.entity";
import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('reclame_aqui')
export class ReclameAqui {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    arquivo: string; // caminho/nome do arquivo/foto

    @Column()
    mensagem: string;

    @Column({ default: false })
    anonimato: boolean;

    @ManyToOne(() => Aluno, (aluno) => aluno.reclameAqui, { eager: true })
    @JoinColumn({ name: 'aluno_id' })
    aluno: Aluno;
}