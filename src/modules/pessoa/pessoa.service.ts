import { Injectable, HttpException } from '@nestjs/common';
import { db } from '../../db/sqlite';

@Injectable()
export class PessoaService {

    public getAllPessoas() {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM pessoa', (err, rows) => {
                return !err ? resolve(rows) : reject(new HttpException(err, 500));
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

    public createPessoa(nome: string) {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO pessoa (nome)' +
                'VALUES (?)', [nome], (err) => {
                    return !err ? resolve({message: 'Pessoa criada.'}) : reject(new HttpException(err, 500));
            });
        });
    }

    public updatePessoa(id: string, nome: string) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE pessoa SET nome = ?' + 'WHERE(id = ?);', [nome, id], (err) => {
                    return !err ? resolve({message: 'Pessoa ' + id + ' foi atualizada com sucesso'}) : reject(new HttpException(err, 500));
            });
        });
    }

    public deletePessoa(id: string) {
        return new Promise((resolve, reject) => {
            db.run(
                'DELETE FROM pessoa WHERE id = ?', [id], (err) => {
                    return !err ? resolve({message: 'Pessoa ' + id + ' foi deletada.'}) : reject(new HttpException(err, 500));
            });
        });
    }
}
