import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    public async create(createUserDto: CreateUserDto) {
        const salt = 10
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt)

        return this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword
            }
        })
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
