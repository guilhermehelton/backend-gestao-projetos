import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/AuthService";
import { AuthDTO } from "../dto/AuthDTO";
import { Public } from "../config/PublicMetadata";

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @Public()
    @Post('/logar')
    signIn(@Body() auth: AuthDTO){
        return this.authService.signIn(auth.email, auth.senha);
    }
}