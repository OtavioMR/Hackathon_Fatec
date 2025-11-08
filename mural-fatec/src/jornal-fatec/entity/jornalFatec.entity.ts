import { Aluno } from "src/aluno/entity/aluno.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity('jornal_fatec')
export class JornalFatec {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    mensagem: string;

    @Column({ nullable: true })
    arquivo: string; // aqui vai o caminho/nome do arquivo anexado

    @Column({ nullable: true })
    foto: string; // aqui vai o caminho/nome da foto

    @ManyToOne(() => Aluno, (aluno) => aluno.jornais, { eager: true })
    @JoinColumn({ name: 'aluno_id' })
    aluno: Aluno;
}