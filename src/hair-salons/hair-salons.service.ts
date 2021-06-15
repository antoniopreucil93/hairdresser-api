import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HairSalonRepository } from './hair-salons.repository';

@Injectable()
export class HairSalonsService {
  constructor(
    @InjectRepository(HairSalonRepository)
    private readonly hairSalonRepository: HairSalonRepository,
  ) {}

  public async getOne(hairSalonId: number) {
    const hairSalon = await this.hairSalonRepository.findOne(hairSalonId);

    if (!hairSalon)
      throw new NotFoundException('Frizerski salon nije pronađen.');

    return this.hairSalonRepository.findOne(hairSalonId, {
      relations: ['services'],
    });
  }

  public get() {
    return this.hairSalonRepository.find({
      order: { id: 'ASC' },
    });
  }

  public create(hairSalonPayload) {
    return this.hairSalonRepository.save(hairSalonPayload);
  }

  public async update(hairSalonId: number, hairSalonPayload) {
    const hairSalon = await this.hairSalonRepository.findOne(hairSalonId);

    if (!hairSalon)
      throw new NotFoundException('Frizerski salon nije pronađen.');

    return this.hairSalonRepository.save({ ...hairSalon, ...hairSalonPayload });
  }

  public async remove(hairSalonId: number) {
    const hairSalon = await this.hairSalonRepository.findOne(hairSalonId);

    if (!hairSalon)
      throw new NotFoundException('Frizerski salon nije pronađen.');

    return this.hairSalonRepository.remove(hairSalon);
  }
}
