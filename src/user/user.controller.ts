import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Get('/profile')
  public async getUserById(@Request() req: any) {
    const userProfile = await this.userService.getOneUserById(req.user.id);
    return userProfile;
  }

  @Post('/register')
  public async create(@Body() createUserDto: CreateUserDto ) {
    return this.userService.create(createUserDto)
  }

  @Get('/register/:email')
  public async getOneEmailUser(@Param('email') email: string) {
    return this.userService.getOneUserEmail(email);
  }
}
