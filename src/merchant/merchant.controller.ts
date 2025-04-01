import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Get('/register/:email')
  public async getMerchantByEmail(@Param('email') email: string ) {
    return this.merchantService.getMerchantByEmail(email)
  }

  @Post('/register/account')
  public async createNewMerchantAccount(@Body() createMerchant: CreateMerchantDto ) {
    return this.merchantService.createNewMerchantAccount(createMerchant)
  }
}
