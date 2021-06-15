import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../shared/services';
import { HairSalonsService } from './hair-salons.service';

@Controller('hair-salons')
export class HairSalonsController {
  constructor(private readonly service: HairSalonsService) {}

  @Roles('SUPERADMIN', 'HAIRDRESSER_ADMIN', 'USER')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':hairSalonId')
  getOne(@Param('hairSalonId') hairSalonId: number) {
    return this.service.getOne(hairSalonId);
  }

  @Roles('SUPERADMIN', 'HAIRDRESSER_ADMIN', 'USER')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  get() {
    return this.service.get();
  }

  @Roles('SUPERADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() hairSalonPayload) {
    return this.service.create(hairSalonPayload);
  }

  @Roles('SUPERADMIN', 'HAIRDRESSER_ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':hairSalonId')
  update(@Param('hairSalonId') hairSalonId: number, @Body() hairSalonPayload) {
    return this.service.update(hairSalonId, hairSalonPayload);
  }

  @Roles('SUPERADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':hairSalonId')
  removeHairSalon(@Param('hairSalonId') hairSalonId: number) {
    return this.service.remove(hairSalonId);
  }
}
