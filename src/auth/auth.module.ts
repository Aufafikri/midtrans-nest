import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { MerchantService } from 'src/merchant/merchant.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, MerchantService],
})
export class AuthModule {}
