import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Habilidades } from "./Habilidades.entity";

@Entity()
export class Aluno {
    @PrimaryGeneratedColumn()
    id_aluno: number;

    @Column({ length: 128 })
    nome: string;

    @Column({ length: 128 })
    email: string;

    @Column({ length: 256 })
    senha: string;

    @Column()
    semestre: number;

    @ManyToMany(() => Habilidades, (habilidade) => habilidade.alunos)
    @JoinTable({ name: 'aluno_habilidades',
        joinColumn: { name: 'id_aluno', referencedColumnName: 'id_aluno' },
        inverseJoinColumn: { name: 'id_habilidade', referencedColumnName: 'id_habilidade' }})
    habilidades: Habilidades[];

    @Column({ default: true })
    ativo: boolean;
}