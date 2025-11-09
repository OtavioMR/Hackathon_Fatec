import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Aluno } from 'src/aluno/entity/aluno.entity';

@Entity()
export class ReclameAqui {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mensagem: string;

  @Column({ nullable: true })
  arquivo?: string;

  @ManyToOne(() => Aluno, aluno => aluno.reclameAqui)
  aluno: Aluno;

  @CreateDateColumn()
  criadoEm: Date; // <-- adiciona aqui
}
