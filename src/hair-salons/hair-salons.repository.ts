import { EntityRepository, Repository } from 'typeorm';
import { HairSalon } from './entities/hair-salons.entity';

@EntityRepository(HairSalon)
export class HairSalonRepository extends Repository<HairSalon> {}
