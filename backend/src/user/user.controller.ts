import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get('/all')
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map((userEntity) => new ReturnUserDto(userEntity));
  }

  @Get('/by-email')
  async findUserByEmail(@Query('email') email: string): Promise<ReturnUserDto> {
    return this.userService.findUserByEmail(email);
  }
}
