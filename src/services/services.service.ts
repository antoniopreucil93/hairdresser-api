import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/services.entity';
import { ServiceRepository } from './services.repository';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceRepository)
    private readonly serviceRepository: ServiceRepository,
  ) {}

  public async getOne(hairSalonId) {
    return this.serviceRepository.find({
      where: { hairSalonId },
      order: { id: 'DESC' },
    });
  }

  public async create(servicePayload) {
    return this.serviceRepository.save(servicePayload);
  }

  public async remove(serviceId: number) {
    const service: Service = await this.serviceRepository.findOne(serviceId);

    if (!service) throw new NotFoundException('Usluga nije pronađena.');

    return this.serviceRepository.remove(service);
  }
}
