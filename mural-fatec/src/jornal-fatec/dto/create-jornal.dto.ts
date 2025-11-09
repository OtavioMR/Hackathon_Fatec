import { IsOptional, IsString } from 'class-validator';

export class CreateJornalDto {
    @IsString()
    @IsOptional()
    mensagem: string;

    @IsString()
    titulo: string;

    @IsString()
    @IsOptional()
    arquivo?: string; // Caminho do arquivo (documento)

    @IsString()
    @IsOptional()
    foto?: string; // Caminho da foto
}
