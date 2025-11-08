import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AlunoService } from "src/aluno/aluno.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private alunoService: AlunoService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret',
        });
    }

    async validate(payload: any) {
        //Verifica o tipo de usuário
        if (payload.role === "aluno") {
            const aluno = await this.alunoService.findOne(payload.sub);
            if (!aluno) {
                throw new UnauthorizedException('Aluno não encontrado');
            }
            const { senha, ...result } = aluno;
            return { ...result, role: 'aluno' };
        }
        // Caso o payload não tenha um role válido
        throw new UnauthorizedException('Tipo de usuário inválido no token');
    }

}