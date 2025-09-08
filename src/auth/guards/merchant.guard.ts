import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class MerchantAuthGuard extends AuthGuard('merchant-jwt') {
    handleRequest(err, user, info, context: ExecutionContext, status) {
        const req = context.switchToHttp().getRequest()
        req.merchant = user
        console.log('merchant guard request:', user)
        return user

    }
}