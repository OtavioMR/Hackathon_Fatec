import { IsEmail, IsString } from "class-validator";

export class LoginAlunoDto {
    @IsEmail()
    email: string;

    @IsString()
    senha: string;
}