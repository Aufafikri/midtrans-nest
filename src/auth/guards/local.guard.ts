import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('user-jwt') {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        const req = context.switchToHttp().getRequest()
        req.user = user
        return user
    }
}