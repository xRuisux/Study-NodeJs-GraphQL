
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { AuthMiddleware } from '../../middleware/auth.middleware';
// import { PessoaFisicaController } from './pessoa-fisica.controller';
import { PessoaFisicaService } from './pessoa-fisica.service';
import { PessoaFisicaResolvers } from './pessoa-fisica.resolvers';

@Module({
    controllers: [ /*PessoaFisicaController*/ ],
    providers: [ PessoaFisicaService, PessoaFisicaResolvers],
})

export class PessoaFisicaModule {
 /*   configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(PessoaController);
    } */
}
