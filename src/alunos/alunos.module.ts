import { Module } from "@nestjs/common";
import { AlunoController } from "./controllers/AlunoController";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Aluno } from "./entities/Aluno.entity";
import { AlunoService } from "./services/AlunoService";
import { AlunoRepository } from "./repositories/AlunoRepository";
import { Habilidades } from "./entities/Habilidades.entity";
import { HabilidadesRepository } from "./repositories/HabilidadesRepository";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/auth/config/AuthGuard";

@Module({
    imports: [TypeOrmModule.forFeature([Aluno, Habilidades])],
    providers: [
        AlunoService, AlunoRepository, HabilidadesRepository],
    controllers: [AlunoController],
    exports: [AlunoRepository]
})
export class AlunosModule{}