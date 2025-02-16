import { ApiProperty } from "@nestjs/swagger";
import { HabilidadesDTO } from "./HabilidadeDTO";

export class AlunoAtualizarDTO {
    @ApiProperty({nullable: false})
    id_aluno: number;
    @ApiProperty()
    nome: string;
    @ApiProperty({type: HabilidadesDTO, isArray: true})
    habilidades: HabilidadesDTO[];
}