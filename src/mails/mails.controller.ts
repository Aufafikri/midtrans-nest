import { Controller, Get, Query } from '@nestjs/common';
import { MailsService } from './mails.service';

@Controller('mails')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  @Get('/verify-email-merchant')
  public async verifyMerchantEmail(@Query('token') token: string ) {
    return this.mailsService.verifyMerchantEmail(token)
  }

  @Get('/verify-email-user')
  public async verifyUserEmail(@Query('token') token: string ) {
    return this.mailsService.verifyUserEmail(token)
  }
}
