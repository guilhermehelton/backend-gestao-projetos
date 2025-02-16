import { ApiProperty } from "@nestjs/swagger";
import { HabilidadesDTO } from "./HabilidadeDTO";

export class AlunoRequestDTO {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    senha: string;
    @ApiProperty({type: HabilidadesDTO, isArray: true})
    habilidades: HabilidadesDTO[];
    @ApiProperty()
    semestre: number;
}