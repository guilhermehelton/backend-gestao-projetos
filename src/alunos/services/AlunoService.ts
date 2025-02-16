import { Injectable } from "@nestjs/common";
import { AlunoRepository } from "../repositories/AlunoRepository";
import { Aluno } from "../entities/Aluno.entity";
import { AlunoRequestDTO } from "../dto/AlunoRequestDTO";
import { HabilidadesRepository } from "../repositories/HabilidadesRepository";
import { Habilidades } from "../entities/Habilidades.entity";

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
        const habilidades: Habilidades[] = [];
        aluno.habilidades.forEach(async hab => {
            const habilidade = await this.habRepository.findOne({where: {id_habilidade: hab.id_habilidade}});
            if(habilidade) {
                habilidades.push(habilidade);
            }
        })

        const novoAluno = this.repository.create({
            nome: aluno.nome,
            email: aluno.email,
            senha: aluno.senha,
            semestre: aluno.semestre,
            habilidades: habilidades
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
}