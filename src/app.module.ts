import { Module } from '@nestjs/common';
import { PessoaModule } from './modules/pessoa/pessoa.module';
import { PessoaFisicaModule } from './modules/pessoa-fisica/pessoa-fisica.module';
import { PessoaJuridicaModule } from './modules/pessoa-juridica/pessoa-Juridica.module';

@Module({
  imports: [ PessoaModule, PessoaFisicaModule, PessoaJuridicaModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
