import { Controller, Get, Post, Put, Delete, Request, Response, Body, Param, HttpStatus } from '@nestjs/common';
import { PessoaService } from './pessoa.service';

@Controller('pessoa')
export class PessoaController {

    constructor(
        private pessoaService: PessoaService,
    ) {}

     @Get()
    public async getAllPessoas(@Response() res) {
        const pessoas = await this.pessoaService.getAllPessoas();
        res.status(HttpStatus.OK).json(pessoas);
    }

    @Get('/:id')
    public async getPessoas(@Response() res,  @Param('id') id) {
        const pessoa = await this.pessoaService.getPessoa(id);
        res.status(HttpStatus.OK).json(pessoa);
    }

    @Post()
    public async createPessoa(@Response() res, @Body('nome') nome) {
        const resultado = await this.pessoaService.createPessoa(nome);
        res.status(HttpStatus.CREATED).json(resultado);
    }

    @Put('/:id')
    public async updatePessoa(@Response() res, @Param('id') id, @Body('nome') nome) {
        const resultado = await this.pessoaService.updatePessoa(id, nome);
        res.status(HttpStatus.ACCEPTED).json(resultado);
    }

    @Delete('/:id')
    public async deletePessoa(@Response() res, @Param('id') id) {
        const resultado = await this.pessoaService.deletePessoa(id);
        res.status(HttpStatus.ACCEPTED).json(resultado);
    }
}
