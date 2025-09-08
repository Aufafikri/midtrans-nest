import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateLoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MerchantService } from 'src/merchant/merchant.service';
import { MerchantLoginDto } from './dto/merchant-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly merchantService: MerchantService
  ) {}

  public async login(createLogin: CreateLoginDto) {
    const { email, password } = createLogin;

    const user = await this.userService.getOneUserEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user) {
      throw new UnauthorizedException('errror cudai');
    }

    if(user.isVerified === false) {
      throw new HttpException('user account not verified', 400)
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async merchantLogin(merchantLogin: MerchantLoginDto) {
    const { email, password } = merchantLogin

    const merchant = await this.merchantService.getMerchantByEmail(email)

    if(!merchant && !(await bcrypt.compare(password, merchant.password))) {
      throw new UnauthorizedException()
    }

    if(!merchant) {
      throw new UnauthorizedException()
    }

    if(merchant.isVerified === false) {
      throw new HttpException('merchant account not verified', 400)
    }

    const payload = {
      sub: merchant.id,
      email: merchant.email
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
