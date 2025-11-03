import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/auth/dtos/login.payload.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify<LoginPayload>(token, { algorithms: ['HS256'] });
      const user = await this.userService.findUserById(payload.id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user;

      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid token ', { cause: error });
    }

    return true;
  }
}
