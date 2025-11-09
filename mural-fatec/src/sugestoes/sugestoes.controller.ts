import { Body, Controller, Post, Get, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SugestoesService } from './sugestoes.service';
import { CreateSugestaoDto } from './dto/create-sugestao.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

@Controller('sugestoes')
export class SugestoesController {
    constructor(private readonly sugestoesService: SugestoesService) { }

    // Função para garantir que a pasta de uploads exista
    private ensureUploadsDirectoryExists() {
        const uploadPath = path.join(__dirname, '../../uploads/sugestao');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
    }

    // Endpoint para realizar uma sugestão
    @UseGuards(JwtAuthGuard) // Protege a rota com autenticação JWT
    @UseInterceptors(FileInterceptor('file', { // Intercepta o upload do arquivo
        storage: diskStorage({
            destination: './uploads/sugestao', // Define a pasta onde os arquivos serão salvos
            filename: (req, file, callback) => {
                const filename: string = `${Date.now()}-${file.originalname}`; // Nome único para o arquivo
                callback(null, filename);
            }
        })
    }))
    @Post('realizar-sugestao')
    async create(@Body() dto: CreateSugestaoDto, @Request() req, @UploadedFile() file: Express.Multer.File) {
        // Antes de salvar o arquivo, garantimos que a pasta de upload existe
        this.ensureUploadsDirectoryExists();

        const alunoId = req.user.id; // O ID do aluno vem do token JWT
        const filePath = file ? path.join('uploads', 'sugestao', file.filename) : null; // Caminho do arquivo salvo

        // Chama o serviço para criar a sugestão
        return this.sugestoesService.create(dto, alunoId, filePath);
    }

    // Endpoint para listar todas as sugestões
    @UseGuards(JwtAuthGuard) // Protege a rota com autenticação JWT
    @Get('ver-sugestoes')
    findAll() {
        return this.sugestoesService.findAll();
    }
}