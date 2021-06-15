import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../shared/services';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @Roles('HAIRDRESSER_ADMIN', 'USER')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':hairSalonId')
  getOne(@Param('hairSalonId') hairSalonId: number) {
    console.log(hairSalonId);
    return this.service.getOne(hairSalonId);
  }

  @Roles('HAIRDRESSER_ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() servicePayload: any) {
    return this.service.create(servicePayload);
  }

  @Roles('HAIRDRESSER_ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':serviceId')
  remove(@Param('serviceId') serviceId) {
    return this.service.remove(serviceId);
  }
}
