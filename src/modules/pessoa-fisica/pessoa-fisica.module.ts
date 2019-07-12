
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PessoaFisicaController } from './pessoa-fisica.controller';
import { PessoaFisicaService } from './pessoa-fisica.service';

@Module({
    controllers: [ PessoaFisicaController ],
    providers: [ PessoaFisicaService ],
})

export class PessoaFisicaModule {
 /*   configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(PessoaController);
    } */
}
