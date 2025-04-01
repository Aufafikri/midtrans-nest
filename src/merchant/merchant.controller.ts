import { Body, Controller, Post } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post('/register/account')
  public async createNewMerchantAccount(@Body() createMerchant: CreateMerchantDto ) {
    return this.merchantService.createNewMerchantAccount(createMerchant)
  }
}
