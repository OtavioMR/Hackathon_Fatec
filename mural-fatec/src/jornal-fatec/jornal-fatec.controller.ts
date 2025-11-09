import { Body, Controller, Post, Get, Request, UseGuards, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { JornalFatecService } from './jornal-fatec.service';
import { CreateJornalDto } from './dto/create-jornal.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

@Controller('jornal-fatec')
export class JornalFatecController {
    constructor(private readonly jornalService: JornalFatecService) {}

    // Função para garantir que a pasta de uploads exista
    private ensureUploadsDirectoryExists() {
        const uploadPath = path.join(__dirname, '../../uploads/jornal');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
    }

    // Endpoint para realizar uma postagem
    @UseGuards(JwtAuthGuard) // Protege a rota com autenticação JWT
    @UseInterceptors(
        FilesInterceptor('files', 2, { // Permite o upload de 2 arquivos (documento e foto)
            storage: diskStorage({
                destination: './uploads/jornal', // Define a pasta onde os arquivos serão salvos
                filename: (req, file, callback) => {
                    const filename = `${Date.now()}-${file.originalname}`; // Nome único para os arquivos
                    callback(null, filename);
                }
            }),
            limits: {
                fileSize: 10 * 1024 * 1024, // Limite de 10MB por arquivo
            },
        })
    )
    @Post('realizar-postagem')
    async create(
        @Body() dto: CreateJornalDto, 
        @Request() req, 
        @UploadedFiles() files: Express.Multer.File[] // Array de arquivos
    ) {
        // Garantir que a pasta de upload exista
        this.ensureUploadsDirectoryExists();

        // Verifique se dois arquivos foram enviados
        if (!files || files.length !== 2) {
            throw new BadRequestException('Você deve enviar exatamente dois arquivos: um documento e uma foto.');
        }

        // Obter o ID do aluno
        const alunoId = req.user.id; // O ID do aluno vem do token JWT

        // Acessar os arquivos pelo índice. O primeiro arquivo é o "documento" e o segundo é a "foto".
        const file = files[0]; // Arquivo de documento
        const foto = files[1]; // Arquivo de foto

        // Caminhos dos arquivos salvos
        const filePath = path.join('uploads', 'jornal', file.filename);
        const fotoPath = path.join('uploads', 'jornal', foto.filename);

        // A URL base para acessar os arquivos publicamente
        const fileUrl = `http://localhost:3000/${filePath}`;
        const fotoUrl = `http://localhost:3000/${fotoPath}`;

        // Chama o serviço para salvar a postagem no banco de dados
        return this.jornalService.create(dto, alunoId, fileUrl, fotoUrl); // Passa as URLs para o serviço
    }

    // Endpoint para listar todas as postagens
    @UseGuards(JwtAuthGuard)
    @Get('todas-postagens')
    findAll() {
        return this.jornalService.findAll();
    }
}
