import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
} from '@nestjs/common';

import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userServise: UsersService) {}
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const req = context.switchToHttp().getRequest();
        const { userId } = req.session || {};

        if (userId) {
            const user = await this.userServise.findOne(userId);
            req.currentUser = user;
        }

        return next.handle();
    }
}
