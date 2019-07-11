import { Module } from '@nestjs/common';
import { PessoaModule } from './modules/pessoa/pessoa.module';

@Module({
  imports: [ PessoaModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
