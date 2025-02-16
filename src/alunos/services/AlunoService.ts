import { Injectable } from "@nestjs/common";
import { AlunoRepository } from "../repositories/AlunoRepository";
import { Aluno } from "../entities/Aluno.entity";
import { AlunoRequestDTO } from "../dto/AlunoRequestDTO";
import { HabilidadesRepository } from "../repositories/HabilidadesRepository";
import { In } from "typeorm";
import { AlunoAtualizarDTO } from "../dto/AlunoAtualizarDTO";
import { hash } from "bcrypt";
import { AlunoResponseDTO } from "../dto/AlunoResponseDTO";

@Injectable()
export class AlunoService {
    constructor(
        private readonly repository: AlunoRepository,
        private readonly habRepository: HabilidadesRepository
    ) {}

    async findById(id: number): Promise<AlunoResponseDTO | null> {
        const aluno = await this.repository.findOne({where: {
            id_aluno: id,
            ativo: true,
        }, relations: ['habilidades']});

        return aluno ? {...aluno} : null;
    }

    async findAll(): Promise<AlunoResponseDTO[]> {
        const alunos = await this.repository.find({
            where: {
                ativo: true
            }, relations: ['habilidades']
        });

        return alunos.map(a => {
            const mapped = new AlunoResponseDTO();
            mapped.id_aluno = a.id_aluno;
            mapped.email = a.email;
            mapped.habilidades = a.habilidades;
            mapped.semestre = a.semestre;
            return mapped;
        })
    }

    async findByEmail(email: string): Promise<AlunoResponseDTO | null> {
        const aluno = await this.repository.findOne({ where: {
            email: email,
            ativo: true
        }, relations: ['habilidades']});
        return aluno ? {...aluno} : null;
    }

    async create(aluno: AlunoRequestDTO) : Promise<AlunoResponseDTO> {
        const habilidades = await this.habRepository.findBy({id_habilidade: In(aluno.habilidades.map(e => e.id_habilidade))});

        const hashPass = await hash(aluno.senha, 10);

        const novoAluno = this.repository.create({
            nome: aluno.nome,
            email: aluno.email,
            senha: hashPass,
            semestre: aluno.semestre,
            habilidades: habilidades,
            ativo: true
        })

        const alunoSalvo = await this.repository.save(novoAluno);

        return {...alunoSalvo}
    }

    async delete(idAluno: number): Promise<Aluno | null> {
        const aluno: Aluno | null = await this.repository.findOneBy({id_aluno: idAluno});
        if(!aluno) {
            return null;
        }

        aluno.ativo = false;
        return this.repository.save(aluno);
    }

    async update(aluno: AlunoAtualizarDTO): Promise<AlunoResponseDTO | null> {
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

        return {...alunoSalvo}
    }
}