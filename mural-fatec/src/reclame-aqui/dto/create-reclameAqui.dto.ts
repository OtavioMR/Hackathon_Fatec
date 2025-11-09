import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateReclameAquiDto {
  @IsString()
  mensagem: string;  // Mensagem da reclamação

  @IsOptional()
  @IsString()
  arquivo?: string| null;  // Arquivo (opcional)

  @IsBoolean()
  anonimato: boolean;  // Define se a reclamação é anônima
}
