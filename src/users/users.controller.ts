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
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Roles('SUPERADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('hairdressers')
  getHairdressers() {
    return this.service.getHairdressers();
  }

  @Roles('SUPERADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post(':userId')
  create(@Param('userId') userId: number, @Body() userPayload) {
    return this.service.create(userPayload);
  }

  @Roles('SUPERADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':userId')
  update(@Param('userId') userId: number, @Body() userPayload) {
    return this.service.update(userId, userPayload);
  }

  @Roles('SUPERADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':hairSalonId')
  removeHairSalon(@Param('hairSalonId') hairSalonId: number) {
    return this.service.remove(hairSalonId);
  }
}
