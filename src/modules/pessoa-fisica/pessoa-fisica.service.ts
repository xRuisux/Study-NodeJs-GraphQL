import { Injectable, HttpException } from '@nestjs/common';
import { db } from '../../db/sqlite';

@Injectable()
export class PessoaFisicaService {

    public getAllPessoasFisicas() {
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

    public createPessoaFisica(nome: string, cpf: string) {
        return new Promise(async (resolve, reject) => {

            db.run(
                'INSERT INTO pessoa' +
                'VALUES (?)', [nome], (err) => {
                    return !err ? resolve({message: 'Pessoa criada.'}) : reject(new HttpException(err, 500));
            });
            const pessoaId = db.get(
                    'SELECT id FROM pessoa DESC LIMIT 1', (err, rows) => {
                        return !err ? resolve(rows) : reject(new HttpException(err, 500));
                    });

            console.log(pessoaId);
            db.run(
                'INSERT INTO pessoa_fisica(cpf, pessoa_id)' +
                'VALUES (?,?)', [cpf, pessoaId], (err) => {
                    return !err ? resolve({message: 'Pessoa Fisica criada.'}) : reject(new HttpException(err, 500));
            });
        });
    }

    public updatePessoaFisica(cpf: string, nome: string) {
        console.log(cpf);
        console.log(nome);
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE pessoa AS p INNER JOIN pessoa_fisica AS pf' +
                ' ON p.id = pf.pessoa_id SET p.nome = ?, pf.cpf = ?' + ' WHERE pf.cpf = ?;', [cpf, nome], (err) => {
                    return !err ? resolve({message: 'Pessoa Fisica com cpf: ' + cpf + ' foi atualizada'}) : reject(new HttpException(err, 500));
            });
        });
    }

    public deletePessoaFisica(cpf: string) {
        return new Promise((resolve, reject) => {
            const id = db.run('SELECT pessoa_id From pessoa_fisica WHERE cpf = ?', [cpf]);
            db.run('DELETE FROM pessoa WHERE id = ?', [id], (err) => {
                return !err ? resolve({message: 'Pessoa Fisica com cpf: ' + cpf + ' foi atualizada'}) : reject(new HttpException(err, 500));
            });
        });
    }
}
