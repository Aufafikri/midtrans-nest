import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateLoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MerchantService } from 'src/merchant/merchant.service';

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

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('invalid credentials');
    }

    if (!user) {
      throw new UnauthorizedException();
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
}
