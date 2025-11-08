import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { SugestoesService } from './sugestoes.service';
import { CreateSugestaoDto } from './dto/create-sugestao.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('sugestoes')
export class SugestoesController {
    constructor(private readonly sugestoesService: SugestoesService) { }

    @UseGuards(JwtAuthGuard)
    @Post('realizar-sugestao')
    create(@Body() dto: CreateSugestaoDto) {
        return this.sugestoesService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('ver-sugestoes')
    findAll() {
        return this.sugestoesService.findAll();
    }
}
