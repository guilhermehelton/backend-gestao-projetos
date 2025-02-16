import { ApiProperty } from "@nestjs/swagger";

export class HabilidadesDTO {
    @ApiProperty({nullable: false})
    id_habilidade: number;

    @ApiProperty()
    nome: string;
}