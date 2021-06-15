import { EntityRepository, Repository } from 'typeorm';
import { Service } from './entities/services.entity';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {}
