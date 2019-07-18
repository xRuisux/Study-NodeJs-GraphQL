
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PessoaJuridicaController } from './pessoa-juridica.controller';
import { PessoaJuridicaService } from './pessoa-juridica.service';

@Module({
    controllers: [ PessoaJuridicaController ],
    providers: [ PessoaJuridicaService ],
})

export class PessoaJuridicaModule {
 /*   configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(PessoaController);
    } */
}
