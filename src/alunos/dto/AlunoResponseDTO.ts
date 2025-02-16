import { ApiProperty } from "@nestjs/swagger";
import { HabilidadesDTO } from "./HabilidadeDTO";

export class AlunoResponseDTO {
    @ApiProperty()
    id_aluno: number;

    @ApiProperty()
    email: string;

    @ApiProperty({type: HabilidadesDTO, isArray: true})
    habilidades: HabilidadesDTO[];

    @ApiProperty()
    semestre: number;
}