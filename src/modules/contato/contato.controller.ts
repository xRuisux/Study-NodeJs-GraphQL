import { Controller, Get, Post, Put, Delete, Request, Response, Body, Param, HttpStatus } from '@nestjs/common';
import { ContatoService } from './contato.service';

@Controller('contato')
export class ContatoController {

    constructor(
        private contatoService: ContatoService,
    ) {}

    @Get()
    public async getAllContatos(@Response() res) {
        const contatos = await this.contatoService.getAllContatos();
        res.status(HttpStatus.OK).json(contatos);
    }

    @Get('/:id')
    public async getContatos(@Response() res,  @Param('id') id) {
        const contato = await this.contatoService.getContato(id);
        res.status(HttpStatus.OK).json(contato);
    }

    @Post()
    public async createContato(@Response() res, @Body('tipo') tipo, @Body('contato') contato, @Body('id') id) {
        const resultado = await this.contatoService.createContato(tipo, contato, id);
        res.status(HttpStatus.CREATED).json(resultado);
    }

    @Put('/:id')
    public async updateContato(@Response() res, @Param('id') id, @Body('tipo') tipo, @Body('contato') contato) {
        const resultado = await this.contatoService.updateContato(tipo, contato, id);
        res.status(HttpStatus.ACCEPTED).json(resultado);
    }

    @Delete('/:id')
    public async deleteContato(@Response() res, @Param('id') id) {
        const resultado = await this.contatoService.deleteContato(id);
        res.status(HttpStatus.ACCEPTED).json(resultado);
    }
}
