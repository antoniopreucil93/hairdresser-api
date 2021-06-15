import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getConnection, getRepository } from 'typeorm';
import { pickBy } from 'lodash';
import { compare, hashSync } from 'bcrypt';

import { HairsalonAdminRegistrationDTO, UserRegistrationDTO } from './dto';
import { User } from '../users/entities/users.entity';
import { EUserRoles } from '../users/enum';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginPayload: { username: string; password: string }) {
    const { username, password } = loginPayload;
    const user: User = await getRepository(User).findOne({
      where: { username },
    });

    if (!user)
      throw new NotFoundException('Neispravno korisničko ime ili lozinka.');

    const { password: storedUserPassword } = user;

    if (!(await compare(password, storedUserPassword)))
      throw new BadRequestException('Neispravno korisničko ime ili lozinka.');

    const { id, role, hairSalonId, createdAt } = user;

    if (role === EUserRoles.HAIRDRESSER_ADMIN)
      return {
        id,
        username,
        role,
        hairSalonId,
        accessToken: this.generateAccessToken(
          { id, username, role, createdAt },
          hairSalonId,
        ),
      };

    return {
      id,
      username,
      role,
      hairSalonId,
      accessToken: this.generateAccessToken({ id, username, role, createdAt }),
    };
  }

  async registerUser(userPayload: UserRegistrationDTO) {
    const { username, password } = userPayload;

    const user = await getRepository(User).findOne({ where: { username } });

    if (user)
      throw new BadRequestException(
        'korisnik sa ovim korisničkim imenom postoji.',
      );

    const userToInsert = pickBy(
      { ...userPayload, password: hashSync(password, 10) },
      (x) => x !== null && x !== undefined,
    );

    return getConnection().transaction(async (trx) => {
      const newUser: User = await trx.save(User, userToInsert);

      const { id, hairSalonId, username, role, createdAt } = newUser;

      return {
        id,
        username,
        role,
        hairSalonId,
        accessToken: this.generateAccessToken({
          id,
          username,
          role,
          createdAt,
        }),
      };
    });
  }

  public async registerHairsalonAdmin(
    hairsalonAdminPayload: HairsalonAdminRegistrationDTO,
  ) {
    const { username, password } = hairsalonAdminPayload;

    const hairsalonAdmin = await getRepository(User).findOne({
      where: { username },
    });

    if (hairsalonAdmin)
      throw new BadRequestException(
        'Frizer sa ovim korisničkim imenom postoji.',
      );

    const hairSalonToInsert = pickBy(
      { ...hairsalonAdminPayload, password: hashSync(password, 10) },
      (x) => x !== null && x !== undefined,
    );

    return getConnection().transaction(async (trx) => {
      const newUser: User = await trx.save(User, hairSalonToInsert);

      const { id, username, role, createdAt, hairSalonId } = newUser;

      return this.generateAccessToken(
        { id, username, role, createdAt },
        hairSalonId,
      );
    });
  }

  private generateAccessToken(
    adminPayload: {
      id: number;
      username: string;
      role: number;
      createdAt: string;
    },
    hairSalonId?: number,
  ): string {
    return this.jwtService.sign(
      adminPayload.role === EUserRoles.HAIRDRESSER_ADMIN
        ? adminPayload
        : { ...adminPayload, hairSalonId },
      {
        secret: `${process.env.JWT_SECRET}`,
        expiresIn: '365d',
      },
    );
  }
}
