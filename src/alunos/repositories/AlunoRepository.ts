import { Repository } from "typeorm";
import { Aluno } from "../entities/Aluno.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AlunoRepository extends Repository<Aluno> {
    constructor(@InjectRepository(Aluno) repository: Repository<Aluno>) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}