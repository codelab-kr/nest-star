import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './../api/auth/auth.service';
import { User } from './../api/auth/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<User> {
    return this.authService.vailidateUser(email, password);
  }
  // async validate(email: string, password: string): Promise<any> {
  //   const user = await this.authService.validateUser(email, password);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}
