import * as sqlite3 from 'sqlite3';

const sqlite = new sqlite3.Database('./sqlite', (err) => {
    if (err) {
        console.log('Error when creating the database', err);
    } else {
        console.log('Database created!');
    }
});
const sqlPessoa = 'CREATE TABLE IF NOT EXISTS pessoa (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'nome VARCHAR NOT NULL' +
    ')';

const sqlPessoaFisica = 'CREATE TABLE IF NOT EXISTS pessoa_fisica (' +
    'cpf VACHAR PRIMARY KEY,' +
    'pessoa_id INTEGER NOT NULL,' +
    'FOREIGN KEY(pessoa_id) REFERENCES pessoa(id)' +
    'ON DELETE CASCADE' +
    ')';

const sqlPessoaJuridica = 'CREATE TABLE IF NOT EXISTS pessoa_juridica (' +
    'cnpj VACHAR PRIMARY KEY,' +
    'pessoa_id INTEGER NOT NULL,' +
    'FOREIGN KEY(pessoa_id) REFERENCES pessoa(id)' +
    'ON DELETE CASCADE' +
    ')';

const sqlContatos = 'CREATE TABLE IF NOT EXISTS contatos (' +
    'tipo VACHAR NOT NULL,' +
    'contato VACHAR NOT NULL,' +
    'pessoa_id INTEGER NOT NULL,' +
    'FOREIGN KEY(pessoa_id) REFERENCES pessoa(id)' +
    'ON DELETE CASCADE' +
    ')';

const sqlPopularPessoa = 'INSERT OR IGNORE INTO pessoa(nome) VALUES ("Luiz"), ("Thiago"), ("Paulo"), ("Emprel"), ("Indra")';
const sqlPopularPessoaFisica = 'INSERT INTO pessoa_fisica VALUES ("12332121123", 1)';
const sqlPopularPessoaJuridica = 'INSERT INTO pessoa_juridica VALUES ("123321123", 4), ("12341876123", 5)';
const sqlPopularContatos = 'INSERT INTO contatos VALUES ("telefone", "3321-3123", 1), ("celular", "1111-2222", 3)';
const sqlDeletePessoa = 'DROP TABLE IF EXISTS pessoa;';
const sqlDeletePessoaFisica = 'DROP TABLE IF EXISTS pessoa_fisica;';
const sqlDeletePessoaJuridica = 'DROP TABLE IF EXISTS pessoa_juridica;';
const sqlDeleteContato = 'DROP TABLE IF EXISTS contatos';

sqlite.serialize(() => {
    sqlite.run(sqlDeletePessoa);
    sqlite.run(sqlDeletePessoaFisica);
    sqlite.run(sqlDeletePessoaJuridica);
    sqlite.run(sqlDeletePessoaJuridica);
    sqlite.run(sqlDeleteContato);
    sqlite.run(sqlPessoa);
    sqlite.run(sqlPessoaFisica);
    sqlite.run(sqlPessoaJuridica);
    sqlite.run(sqlContatos);
    sqlite.run(sqlPopularPessoa);
    sqlite.run(sqlPopularPessoaFisica);
    sqlite.run(sqlPopularPessoaJuridica);
    sqlite.run(sqlPopularContatos);

});

export const db = sqlite;
