
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { AuthMiddleware } from '../../middleware/auth.middleware';
import { ContatoController } from './contato.controller';
import { ContatoService } from './contato.service';

@Module({
    controllers: [ ContatoController ],
    providers: [ ContatoService ],
})

export class ContatoModule {
}
