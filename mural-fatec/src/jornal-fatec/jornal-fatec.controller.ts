import { Body, Controller, Post, Get } from '@nestjs/common';
import { JornalFatecService } from './jornal-fatec.service';
import { CreateJornalDto } from './dto/create-jornal.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('jornal-fatec')
export class JornalFatecController {
    constructor(private readonly jornalService: JornalFatecService) { }

    @UseGuards(JwtAuthGuard)
    @Post('realizar-postagem')
    create(@Body() dto: CreateJornalDto) {
        return this.jornalService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('todas-postagens')
    findAll() {
        return this.jornalService.findAll();
    }
}

