import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload): Promise<{
    id: any;
    username: any;
    role: any;
  }> {
    const { id } = payload;
    const user: User = await getRepository(User).findOne(id);

    if (!user) throw new BadRequestException('user not found');

    return payload;
  }
}
