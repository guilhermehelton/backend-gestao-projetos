import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aluno } from "./Aluno.entity";

@Entity()
export class Habilidades {
    @PrimaryGeneratedColumn()
    id_habilidade: number;

    @Column({length: 128})
    nome: string;

    @ManyToMany(() => Aluno, (aluno) => aluno.habilidades)
    alunos: Aluno[];
}