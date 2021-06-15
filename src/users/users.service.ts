import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { EUserRoles } from './enum';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  getHairdressers() {
    return this.userRepository.find({
      where: { role: EUserRoles.HAIRDRESSER_ADMIN },
      order: { id: 'ASC' },
    });
  }

  create(userPayload) {
    return this.userRepository.save(userPayload);
  }

  async update(userId: number, userPayload) {
    const user: User = await this.userRepository.findOne(userId);
    console.log(user);
    if (!user) throw new NotFoundException('korisnik nije pronađen.');

    return this.userRepository.save({
      ...user,
      ...userPayload,
    });
  }

  async remove(userId: number) {
    const user: User = await this.userRepository.findOne(userId);

    if (!user) throw new NotFoundException('korisnik nije pronađen.');

    return this.userRepository.remove(user);
  }
}
