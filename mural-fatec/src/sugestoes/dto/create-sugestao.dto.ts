export class CreateSugestaoDto{
    mensagem: string;
    arquivo?: string;
    alunoId: number;
}

//
// @Column()
//     mensagem: string;

//     @Column({nullable: true})
//     arquivo: string;

//     @ManyToOne(() => Aluno, (aluno) => aluno.sugestoes, {eager: true})
//     @JoinColumn({ name: 'aluno_id'})
//     aluno: Aluno;
//