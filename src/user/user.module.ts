import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailsService } from 'src/mails/mails.service';

@Module({
  controllers: [UserController],
  providers: [UserService, MailsService],
  exports: [UserService]
})
export class UserModule {}
