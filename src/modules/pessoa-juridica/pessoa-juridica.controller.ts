import { Controller, Get, Post, Put, Delete, Request, Response, Body, Param, HttpStatus } from '@nestjs/common';
import { PessoaJuridicaService } from './pessoa-juridica.service';

@Controller('pessoa-juridica')
export class PessoaJuridicaController {

    constructor(
        private pessoaJuridicaService: PessoaJuridicaService,
    ) {}

     @Get()
    public async getAllPessoasJuridicas(@Response() res) {
        const pessoas = await this.pessoaJuridicaService.getAllPessoasJuridicas();
        res.status(HttpStatus.OK).json(pessoas);
    }

    @Get('/:cnpj')
    public async getPessoaJuridica(@Response() res,  @Param('cnpj') cnpj) {
        const pessoa = await this.pessoaJuridicaService.getPessoaJuridica(cnpj);
        res.status(HttpStatus.OK).json(pessoa);
    }

    @Post()
    public async createPessoaJuridica(@Response() res, @Body('nome') nome, @Body('cnpj') cnpj) {
        const resultado = await this.pessoaJuridicaService.createPessoaJuridica(nome, cnpj);
        res.status(HttpStatus.CREATED).json(resultado);
    }

    @Put('/')
    public async updatePessoa(@Response() res, @Body('cnpj') cnpj, @Body('nome') nome) {
        const resultado = await this.pessoaJuridicaService.updatePessoaJuridica(cnpj, nome);
        res.status(HttpStatus.ACCEPTED).json(resultado);
    }

    @Delete('/:cnpj')
    public async deletePessoa(@Response() res, @Param('cnpj') cnpj) {
        const resultado = await this.pessoaJuridicaService.deletePessoaJuridica(cnpj);
        res.status(HttpStatus.ACCEPTED).json(resultado);
    }
}
