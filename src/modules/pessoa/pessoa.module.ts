
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { AuthMiddleware } from '../../middleware/auth.middleware';
// import { PessoaController } from './pessoa.controller';
import { PessoaService } from './pessoa.service';
import { PessoasResolvers } from './pessoa.resolvers';

@Module({
    controllers: [ /*PessoaController*/ ],
    providers: [ PessoaService, PessoasResolvers ],
})

export class PessoaModule {
 /*   configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(PessoaController);
    } */
}
