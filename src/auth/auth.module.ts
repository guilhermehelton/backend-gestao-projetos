import { Module } from "@nestjs/common";
import { AuthService } from "./services/AuthService";
import { AuthController } from "./controllers/AuthController";
import { JwtModule } from "@nestjs/jwt";
import { AlunosModule } from "src/alunos/alunos.module";
import { AuthGuard } from "./config/AuthGuard";
import { APP_GUARD } from "@nestjs/core";

@Module({
    imports: [
        JwtModule.register({
            secret: 'MINHA_CHAVE_SECRETA',
            signOptions: { expiresIn: '1h' },
        }),
        AlunosModule
    ],
    providers: [
        {provide: APP_GUARD, useClass: AuthGuard},
        AuthService],
    controllers: [AuthController]
})
export class AuthModule {}