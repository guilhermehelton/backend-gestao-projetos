import { Injectable } from "@nestjs/common";
import { AlunoRepository } from "../repositories/AlunoRepository";
import { Aluno } from "../entities/Aluno.entity";
import { AlunoRequestDTO } from "../dto/AlunoRequestDTO";
import { HabilidadesRepository } from "../repositories/HabilidadesRepository";
import { In } from "typeorm";
import { AlunoAtualizarDTO } from "../dto/AlunoAtualizarDTO";

@Injectable()
export class AlunoService {
    constructor(
        private readonly repository: AlunoRepository,
        private readonly habRepository: HabilidadesRepository
    ) {}

    async findById(id: number): Promise<Aluno | null> {
        return await this.repository.findOne({where: {
            id_aluno: id,
            ativo: true,
        }, relations: ['habilidades']});
    }

    async findAll() {
        return await this.repository.find({
            where: {
                ativo: true
            }, relations: ['habilidades']
        });
    }

    async create(aluno: AlunoRequestDTO) : Promise<Aluno> {
        const habilidades = await this.habRepository.findBy({id_habilidade: In(aluno.habilidades.map(e => e.id_habilidade))});

        const novoAluno = this.repository.create({
            nome: aluno.nome,
            email: aluno.email,
            senha: aluno.senha,
            semestre: aluno.semestre,
            habilidades: habilidades,
            ativo: true
        })

        return await this.repository.save(novoAluno);
    }

    async delete(idAluno: number): Promise<Aluno | null> {
        const aluno: Aluno | null = await this.repository.findOneBy({id_aluno: idAluno});
        if(!aluno) {
            return null;
        }

        aluno.ativo = false;
        return this.repository.save(aluno);
    }

    async update(aluno: AlunoAtualizarDTO): Promise<Aluno | null> {
        const novoAluno = await this.repository.findOne({where: {id_aluno: aluno.id_aluno, ativo: true}});

        if (!novoAluno) {
            return null;
        }

        if (aluno.habilidades) {
            const habilidades = await this.habRepository.findBy({id_habilidade: In(aluno.habilidades.map(h => h.id_habilidade))});
    
            if (habilidades) {
                novoAluno.habilidades = habilidades;
            }
        }

        if (aluno.nome) {
            novoAluno.nome = aluno.nome;
        }

        const alunoSalvo = await this.repository.save(novoAluno);

        return alunoSalvo;
    }
}