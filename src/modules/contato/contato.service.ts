import { Injectable, HttpException } from '@nestjs/common';
import { db } from '../../db/sqlite';

@Injectable()
export class ContatoService {

    public getAllContatos() {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM contatos AS c INNER JOIN pessoa AS p ON c.pessoa_id = p.id', (err, rows) => {
                return !err ? resolve(rows) : reject(new HttpException(err, 500));
            });
        });
    }

    public getContato(id: any) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM contatos AS c INNER JOIN pessoa AS p ON c.pessoa_id = p.id WHERE id = ?', [id], (err, row) => {
                    return !err ? resolve(row) : reject(new HttpException(err, 500));
            });
        });
    }

    public async createContato(tipo: string, contato: string, id: string) {
        await db.run('INSERT INTO contatos (tipo,pessoa_id,contato) VALUES (?,?)', [tipo, id, contato]);
    }

    public updateContato(id: string, tipo: string, contato: string) {
        console.log(id);
        console.log(tipo);
        console.log(contato);

        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE contatos SET tipo = ?, contato = ? WHERE id = ?', [tipo, contato, id], (err) => {
                    return !err ? resolve({message: 'Contato com id: ' + id + ' foi atualizada'}) : reject(new HttpException(err, 500));
            });
        });
    }

    public deleteContato(id: string) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM contatos WHERE id = ?', [id], (err) => {
                return !err ? resolve({message: 'Contato com id: ' + id + ' foi deletado'}) : reject(new HttpException(err, 500));
            });
        });
    }
}
