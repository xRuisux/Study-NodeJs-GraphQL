import { Injectable, HttpException } from '@nestjs/common';
import { db } from '../../db/sqlite';

@Injectable()
export class PessoaJuridicaService {

    public getAllPessoasJuridicas() {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM pessoa_juridica AS pf INNER JOIN pessoa AS p ON pf.pessoa_id = p.id', (err, rows) => {
                return !err ? resolve(rows) : reject(new HttpException(err, 500));
            });
        });
    }

    public getPessoaJuridica(cnpj: any) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM pessoa_juridica AS pf INNER JOIN pessoa AS p ON pf.pessoa_id = p.id WHERE cnpj = ?', [cnpj], (err, row) => {
                    return !err ? resolve(row) : reject(new HttpException(err, 500));
            });
        });
    }

    public async createPessoaJuridica(nome: string, cnpj: string) {
        await db.run('INSERT INTO pessoa (nome) VALUES (?)', [nome]);
        let pessoaId = Object.values(await this.getLastId());
        pessoaId = pessoaId[0];
        await db.run('INSERT INTO pessoa_juridica (cnpj,pessoa_id) VALUES (?,?)', [cnpj, pessoaId]);
    }

    public getLastId() {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT id FROM pessoa ORDER BY id DESC; ', (err, row) => {
                    return !err ? resolve(row) : reject(new HttpException(err, 500));
            });
        });
    }

    public updatePessoaJuridica(cnpj: string, nome: string) {
        console.log(cnpj);
        console.log(nome);
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE pessoa SET nome = ? WHERE id = (SELECT pessoa_id FROM pessoa_juridica WHERE cnpj = ?)', [nome, cnpj], (err) => {
                    return !err ? resolve({message: 'Pessoa juridica com cnpj: ' + cnpj + ' foi atualizada'}) : reject(new HttpException(err, 500));
            });
        });
    }

    public deletePessoaJuridica(cnpj: string) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM pessoa WHERE id = (SELECT pessoa_id From pessoa_juridica WHERE cnpj = ?)', [cnpj], (err) => {
                return !err ? resolve({message: 'Pessoa juridica com cnpj: ' + cnpj + ' foi atualizada'}) : reject(new HttpException(err, 500));
            });
        });
    }
}
