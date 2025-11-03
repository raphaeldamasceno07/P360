import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnLogin } from './dtos/return-login.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UsePipes(ValidationPipe)
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<ReturnLogin> {
    return this.authService.login(loginDto);
  }
}
