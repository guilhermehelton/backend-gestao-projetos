import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO {
    @ApiProperty({nullable: false})
    email: string;

    @ApiProperty({nullable: false})
    senha: string;
}