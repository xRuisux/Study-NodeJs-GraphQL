import { Injectable, HttpException } from '@nestjs/common';
import { db } from '../../db/sqlite';
import { CreatePessoaFisicaDto } from './dto/pessoa-fisica.create.dto';
import { UpdatePessoaFisicaDto } from './dto/pessoa-fisica.update.dto';

@Injectable()
export class PessoaFisicaService {

    public getAllPessoasFisicas() {
        console.log('chegou aqui');
        
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM pessoa_fisica AS pf INNER JOIN pessoa AS p ON pf.pessoa_id = p.id', (err, rows) => {
                return !err ? resolve(rows) : reject(new HttpException(err, 500));
            });
        });
    }

    public getPessoaFisica(cpf: any) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM pessoa_fisica AS pf INNER JOIN pessoa AS p ON pf.pessoa_id = p.id WHERE cpf = ?', [cpf], (err, row) => {
                    return !err ? resolve(row) : reject(new HttpException(err, 500));
            });
        });
    }

    public async createPessoaFisica(pessoaFisicaDto: CreatePessoaFisicaDto) {
        await db.run('INSERT INTO pessoa (nome) VALUES (?)', [pessoaFisicaDto.nome]);
        const pessoaId = Object.values(await this.getId())[0];
        await db.run('INSERT INTO pessoa_fisica (cpf,pessoa_id) VALUES (?,?)', [pessoaFisicaDto.cpf, pessoaId]);
    }

    public getId(id = null) {
        if (id == null) {
            return new Promise((resolve, reject) => {
                db.get(
                    'SELECT * FROM pessoa ORDER BY id DESC; ', (err, row) => {
                        return !err ? resolve(row) : reject(new HttpException(err, 500));
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.get(
                    'SELECT * FROM pessoa_fisica WHERE id = ?; ', [id], (err, row) => {
                        return !err ? resolve(row) : reject(new HttpException(err, 500));
                });
            });
        }
    }

    public updatePessoaFisica(pessoaFisicaDto: UpdatePessoaFisicaDto) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE pessoa SET nome = ? WHERE id = (SELECT pessoa_id FROM pessoa_fisica WHERE cpf = ?)', [pessoaFisicaDto.nome, pessoaFisicaDto.cpf], (err) => {
                    return !err ? resolve({message: 'Pessoa Fisica com cpf: ' + pessoaFisicaDto.cpf + ' foi atualizada'}) : reject(new HttpException(err, 500));
            });
        });
    }

    public deletePessoaFisica(cpf: string) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM pessoa WHERE id = (SELECT pessoa_id From pessoa_fisica WHERE cpf = ?)', [cpf], (err) => {
                return !err ? resolve({message: 'Pessoa Fisica com cpf: ' + cpf + ' foi atualizada'}) : reject(new HttpException(err, 500));
            });
        });
    }
}
