import { Body, Controller, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(LocalAuthGuard)
  public async getUserById(@Request() req: any) {
    console.log('User dari JWT:', req.user)
    return this.userService.getOneUserById(req.user.id)
  }

  @Post('/register')
  public async create(@Body() createUserDto: CreateUserDto ) {
    return this.userService.create(createUserDto)
  }

  @Get('/register/:email')
  public async getOneEmailUser(@Param('email') email: string) {
    return this.userService.getOneUserEmail(email);
  }

  @Post(':id/avatar')
   @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // folder lokal sementara
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadAvatar(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadUserAvatar(userId, file);
  }
}
