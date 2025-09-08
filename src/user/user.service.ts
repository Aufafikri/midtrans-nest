import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Express } from 'Express';
import { PrismaService } from '../libs/prisma.service';
import { MailsService } from '../mails/mails.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailsService: MailsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        isVerified: false,
      },
    });

    await this.mailsService.sendEmailUserVerificaiton(user.id, user.email);

    return user;
  }

  public async getOneUserEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async getOneUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async uploadUserAvatar(userId: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const result = await this.cloudinaryService.uploadImage(file.path);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        avatar: result.secure_url,
      },
    });
  }
}
