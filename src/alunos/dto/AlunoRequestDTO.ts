import { ApiProperty } from "@nestjs/swagger";
import { HabilidadesDTO } from "./HabilidadeDTO";

export class AlunoRequestDTO {
    @ApiProperty({nullable: false})
    nome: string;
    @ApiProperty({nullable: false})
    email: string;
    @ApiProperty({nullable: false})
    senha: string;
    @ApiProperty({type: HabilidadesDTO, isArray: true, nullable: false})
    habilidades: HabilidadesDTO[];
    @ApiProperty({nullable: false})
    semestre: number;
}