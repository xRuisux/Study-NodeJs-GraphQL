import { Module } from '@nestjs/common';
import { PessoaModule } from './modules/pessoa/pessoa.module';
import { PessoaFisicaModule } from './modules/pessoa-fisica/pessoa-fisica.module';

@Module({
  imports: [ PessoaModule, PessoaFisicaModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
