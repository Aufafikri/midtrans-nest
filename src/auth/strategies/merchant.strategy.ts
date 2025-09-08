import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { MerchantService } from "src/merchant/merchant.service";

@Injectable()
export class MerchantStrategy extends PassportStrategy(Strategy, 'merchant-jwt') {
    constructor(private readonly merchantService: MerchantService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    public async validate(payload: any) {
        const merchant = await this.merchantService.getMerchantById(payload.sub)

        if(!merchant) {
            throw new UnauthorizedException()
        }

        return merchant
    }
}