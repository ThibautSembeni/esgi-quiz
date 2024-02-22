import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ where: { username } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: { username: string; password: string }) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const newUser = await this.usersService.create({
      ...user,
      password: hash,
    });
    const { password, ...result } = newUser;
    return result;
  }
}
