import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { MailsService } from 'src/mails/mails.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService, private readonly mailsService: MailsService) {}

    public async create(createUserDto: CreateUserDto) {
        const salt = 10
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt)

        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
                isVerified: false
            }
        })

        await this.mailsService.sendEmailUserVerificaiton(user.id, user.email)

        return user
    }

    public async getOneUserEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    public async getOneUserById(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }
}
