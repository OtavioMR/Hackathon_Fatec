import { Controller, Post, Get, Body, UseGuards, Request, InternalServerErrorException } from '@nestjs/common';
import { ReclameAquiService } from './reclame-aqui.service';
import { CreateReclameAquiDto } from './dto/create-reclameAqui.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';

@Controller('reclame-aqui')
export class ReclameAquiController {
    constructor(private readonly reclameAquiService: ReclameAquiService) { }

    // Método para criar uma nova reclamação
    @UseGuards(JwtAuthGuard)
    @Post('criar-reclamacao')
    @UseInterceptors(FileInterceptor('arquivo'))
    async create(
        @UploadedFile() arquivo: Express.Multer.File,
        @Body() body: any,
        @Request() req
    ) {
        try {
            const alunoId = req.user.id;

            // Converter o campo "anonimato" de string para boolean
            const dto: CreateReclameAquiDto = {
                mensagem: body.mensagem,
                arquivo: arquivo?.filename,
            };

            console.log('Aluno ID:', alunoId);
            console.log('Dados da reclamação:', dto);

            return await this.reclameAquiService.create(dto, alunoId);
        } catch (error) {
            console.error('Erro ao criar reclamação:', error);
            throw new InternalServerErrorException('Erro ao criar reclamação');
        }
    }

    // Método para listar todas as reclamações
    @UseGuards(JwtAuthGuard)
    @Get('ver-reclamacoes')
    async findAll() {
        try {
            const reclamações = await this.reclameAquiService.findAll();
            console.log('Reclamações encontradas:', reclamações);
            return reclamações;
        } catch (error) {
            console.error('Erro ao buscar reclamações:', error);
            throw new InternalServerErrorException('Erro ao buscar as reclamações');
        }
    }
}
