import { Injectable, HttpException } from '@nestjs/common';
import { db } from '../../db/sqlite';
import { CreatePessoaDto } from './dto/createPessoa.dto';
import { UpdatePessoaDto } from './dto/updatePessoa.dto';

@Injectable()
export class PessoaService {

    public getAllPessoas() {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM pessoa', (err, rows) => {
                    const listPessoas = [];
                    // tslint:disable-next-line: prefer-for-of
                    for (let i = 0; i < rows.length; i++) {
                    const pessoa = rows[i];
                    listPessoas.push(pessoa);
                }
                    return !err ? resolve(listPessoas) : reject(new HttpException(err, 500));
            });
        });
    }

    public getPessoa(id: any) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM pessoa WHERE id = ?', [id], (err, row) => {
                    return !err ? resolve(row) : reject(new HttpException(err, 500));
            });
        });
    }

    public createPessoa(pessoaDto: CreatePessoaDto) {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO pessoa (nome)' +
                'VALUES (?)', [pessoaDto.nome], (err) => {
                return !err ? resolve(this.getId()) : reject(new HttpException(err, 500));
            });
        });
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
                    'SELECT * FROM pessoa WHERE id = ?; ', [id], (err, row) => {
                        console.log(row);
                        return !err ? resolve(row) : reject(new HttpException(err, 500));
                });
            });
        }
    }

    public updatePessoa(pessoaDto: UpdatePessoaDto) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE pessoa SET nome = ?' + 'WHERE id = ?', [pessoaDto.nome, pessoaDto.id], (err) => {
                    return !err ? resolve(this.getId(pessoaDto.id)) : reject(new HttpException(err, 500));
            });
        });
    }

    public deletePessoa(id: string) {
        console.log("entrou deletePessoa");
        
        return new Promise((resolve, reject) => {
            db.run(
                'DELETE FROM pessoa WHERE id = ?', [id], (err) => {
                    return !err ? resolve('Pessoa do ' + id + ' foi deletada.') : reject(new HttpException(err, 500));
            });
        });
    }
}
