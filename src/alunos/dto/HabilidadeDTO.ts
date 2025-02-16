import { ApiProperty } from "@nestjs/swagger";

export class HabilidadesDTO {
    @ApiProperty()
    id_habilidade: number;

    @ApiProperty()
    nome: string;
}