import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ReclameAquiService } from './reclame-aqui.service';
import { CreateReclameAquiDto } from './dto/create-reclameAqui.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('reclame-aqui')
export class ReclameAquiController {
    constructor(private readonly reclameAquiService: ReclameAquiService) { }

    @UseGuards(JwtAuthGuard)
    @Post('criar-reclamacao')
    create(@Body() dto: CreateReclameAquiDto) {
        return this.reclameAquiService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('ver-reclamacoes')
    findAll() {
        return this.reclameAquiService.findAll();
    }
}
