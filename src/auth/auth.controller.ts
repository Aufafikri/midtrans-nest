import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/login.dto';
import { CreateMerchantDto } from 'src/merchant/dto/create-merchant.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user/login')
  public async login(@Body() createLoginDto: CreateLoginDto ) {
    return this.authService.login(createLoginDto)
  }

  @Post('/merchant/login')
  public async loginMerchant(@Body() createMerchant: CreateMerchantDto ) {
    return this.authService.merchantLogin(createMerchant)
  }
}
