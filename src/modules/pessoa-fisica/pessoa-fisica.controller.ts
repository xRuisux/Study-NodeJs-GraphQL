import { Controller, Get, Post, Put, Delete, Request, Response, Body, Param, HttpStatus } from '@nestjs/common';
import { PessoaFisicaService } from './pessoa-fisica.service';

@Controller('pessoa-fisica')
export class PessoaFisicaController {

    constructor(
        private pessoaFisicaService: PessoaFisicaService,
    ) {}

     @Get()
    public async getAllPessoasFisicas(@Response() res) {
        const pessoas = await this.pessoaFisicaService.getAllPessoasFisicas();
        res.status(HttpStatus.OK).json(pessoas);
    }

    @Get('/:cpf')
    public async getPessoaFisica(@Response() res,  @Param('cpf') cpf) {
        const pessoa = await this.pessoaFisicaService.getPessoaFisica(cpf);
        res.status(HttpStatus.OK).json(pessoa);
    }

    @Post()
    public async createPessoaFisica(@Response() res, @Body('nome') nome, @Body('cpf') cpf) {
        const resultado = await this.pessoaFisicaService.createPessoaFisica(nome, cpf);
        res.status(HttpStatus.CREATED).json(resultado);
    }

    @Put('/')
    public async updatePessoa(@Response() res, @Body('cpf') cpf, @Body('nome') nome) {
        const resultado = await this.pessoaFisicaService.updatePessoaFisica(cpf, nome);
        res.status(HttpStatus.ACCEPTED).json(resultado);
    }

    @Delete('/:cpf')
    public async deletePessoa(@Response() res, @Param('cpf') cpf) {
        const resultado = await this.pessoaFisicaService.deletePessoaFisica(cpf);
        res.status(HttpStatus.ACCEPTED).json(resultado);
    }
}
