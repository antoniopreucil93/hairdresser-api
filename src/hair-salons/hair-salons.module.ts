import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HairSalonsService } from './hair-salons.service';
import { HairSalonsController } from './hair-salons.controller';
import { HairSalon } from './entities/hair-salons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HairSalon])],
  providers: [HairSalonsService],
  controllers: [HairSalonsController],
})
export class HairSalonsModule {}
