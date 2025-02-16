import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { AlunoRepository } from "src/alunos/repositories/AlunoRepository";
import { AlunoService } from "src/alunos/services/AlunoService";

@Injectable()
export class AuthService {
    constructor(
        private readonly alunoRepository: AlunoRepository,
        private readonly jwtService: JwtService
    ) {}

    async signIn(email: string, senha: string) {
        const aluno = await this.alunoRepository.findOne({where: {email: email, ativo: true}});
        if (!aluno) {
            return;
        }

        const passMatch = await compare(senha, aluno.senha);

        if (!passMatch) {
            throw new UnauthorizedException();
        }

        const payload = {sub: aluno.id_aluno, email: aluno.email};
        const token = this.jwtService.sign(payload);

        return { jwt: token};
    }
}