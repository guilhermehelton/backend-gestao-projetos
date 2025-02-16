import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { AlunoService } from "../services/AlunoService";
import { AlunoRequestDTO } from "../dto/AlunoRequestDTO";
import { AlunoAtualizarDTO } from "../dto/AlunoAtualizarDTO";

@Controller('aluno')
export class AlunoController {
    constructor(private readonly service: AlunoService) {}

    @Get(':id')
    findById(@Param('id') id: number) {
        const aluno = this.service.findById(id);
        if(!aluno) {
            throw new HttpException('Aluno não encontrado', HttpStatus.NOT_FOUND);
        }

        return aluno;
    }
    
    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post()
    async create(@Body() input: AlunoRequestDTO) {
        return await this.service.create(input);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const alunoRemovido = await this.service.delete(id) ? true : false;
        if(!alunoRemovido) {
            throw new HttpException('Erro ao desativas cadastro de aluno', HttpStatus.NOT_FOUND);
        }
        
        return 'Cadastro do aluno desativado com sucesso!';
    }

    @Put()
    async update(@Body() aluno: AlunoAtualizarDTO) {
        if (!aluno.id_aluno) {
            throw new HttpException('Informações inválidas', HttpStatus.BAD_REQUEST)
        }

        return await this.service.update(aluno);
    }
}