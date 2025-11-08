import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAlunoDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    //LOGIN DO ALUNO        
    @Post('aluno/login')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async loginAluno(@Body() dto: LoginAlunoDto) {
        return this.authService.loginAluno(dto.email, dto.senha);
    }
}
