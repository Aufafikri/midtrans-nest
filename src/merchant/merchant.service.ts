import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { MailsService } from 'src/mails/mails.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class MerchantService {
    constructor(private readonly prisma: PrismaService, private readonly mailsService: MailsService) {}

    public async createNewMerchantAccount(createMerchant: CreateMerchantDto) {
        const salt = 10
        const hashedPassword = await bcrypt.hash(createMerchant.password, salt)
        const merchant = await this.prisma.merchant.create({
            data: {
                ...createMerchant,
                password: hashedPassword,
                isVerified: false
            }
        })

        await this.mailsService.sendEmailMerchantVerification(merchant.id, merchant.email)

        return {
            message: 'check your email address to verified your email'
        }
    }
}
