import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AlunoService } from 'src/aluno/aluno.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private alunoService: AlunoService,
        private jwtService: JwtService,
    ) { }

    async loginAluno(email: string, senha: string) {
        const aluno = await this.alunoService.findByEmail(email);
        if (!aluno) {
            throw new UnauthorizedException('Credencias inválidas');
        }

        const senhaInvalida = await bcrypt.compare(senha, aluno.senha);
        if (!senhaInvalida) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: aluno.id, role: 'aluno' };
        const token = this.jwtService.sign(payload);

        return {
            access_token: token, aluno
        };
    }
}
