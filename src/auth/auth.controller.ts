import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user/login')
  public async login(@Body() createLoginDto: CreateLoginDto ) {
    return this.authService.login(createLoginDto)
  }

  // @Post('/merchant/login')
}
