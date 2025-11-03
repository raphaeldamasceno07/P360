import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { UserEntity } from 'src/db/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from 'src/utils/password';
import { ReturnLogin } from './dtos/return-login.dto';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    console.log('password has value? ":', loginDto.password);
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await validatePassword(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('Invalid email or password');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: new ReturnUserDto(user),
    };
  }
}
