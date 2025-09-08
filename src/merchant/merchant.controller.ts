import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { MerchantAuthGuard } from 'src/auth/guards/merchant.guard';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @UseGuards(MerchantAuthGuard)
  @Get('/profile')
  public async getMerchantProfile(@Request() req: any ) {
    console.log('profile', req.merchant)
    return this.merchantService.getMerchantById(req.merchant.id)
  }

  @Get('/register/:email')
  public async getMerchantByEmail(@Param('email') email: string ) {
    return this.merchantService.getMerchantByEmail(email)
  }

  @Post('/register/account')
  public async createNewMerchantAccount(@Body() createMerchant: CreateMerchantDto ) {
    return this.merchantService.createNewMerchantAccount(createMerchant)
  }
}
