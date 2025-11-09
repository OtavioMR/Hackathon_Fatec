import { Aluno } from "src/aluno/entity/aluno.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity('jornal_fatec')
export class JornalFatec {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    titulo: string;

    @Column({nullable: true})
    mensagem: string;

    // Altere o tipo para string (ou text, caso precise de mais espaço)
    @Column({type: 'text', nullable: true })
    arquivo?: string | null; // Aqui vai o caminho/nome do arquivo anexado

    // Altere o tipo para string (ou text, caso precise de mais espaço)
    @Column({type: 'text', nullable: true })
    foto?: string | null; // Aqui vai o caminho/nome da foto

    @ManyToOne(() => Aluno, (aluno) => aluno.jornais, { eager: true })
    @JoinColumn({ name: 'aluno_id' })
    aluno: Aluno;
}
