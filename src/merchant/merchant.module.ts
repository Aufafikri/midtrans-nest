import { Global, Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MailsService } from 'src/mails/mails.service';

@Global()
@Module({
  controllers: [MerchantController],
  providers: [MerchantService, MailsService],
  exports: [MerchantService]
})
export class MerchantModule {}
