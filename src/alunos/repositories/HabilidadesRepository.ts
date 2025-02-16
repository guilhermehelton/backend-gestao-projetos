import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Habilidades } from "../entities/Habilidades.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class HabilidadesRepository extends Repository<Habilidades> {
    constructor(
        @InjectRepository(Habilidades) repository: Repository<Habilidades>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}