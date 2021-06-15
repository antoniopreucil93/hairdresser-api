import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { query } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../shared/services';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Roles('HAIRDRESSER_ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('hair-salon/:hairSalonId')
  getHairSalonOrders(@Param('hairSalonId') hairSalonId: number) {
    return this.service.getHairSalonOrders(+hairSalonId);
  }

  @Roles('USER')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('today/:hairSalonId')
  getHairSalonTodayOrders(@Param('hairSalonId') hairSalonId: number) {
    return this.service.getHairSalonTodayOrders(+hairSalonId);
  }

  @Roles('USER')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('user/today/:userId')
  getUserOrderForToday(@Param('userId') userId: number, @Query() qs: any) {
    return this.service.getUserOrderForToday(+userId, qs);
  }

  @Roles('USER')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('user/:userId')
  getUserOrders(@Param('userId') userId: any) {
    return this.service.getUserOrders(+userId);
  }

  @Roles('USER')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  createOrder(@Body() orderPayload: any) {
    return this.service.createOrder(orderPayload);
  }

  @Roles('HAIRDRESSER_ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':orderId')
  updateOrder(@Param('orderId') orderId, @Body() orderPayload: any) {
    return this.service.updateOrder(orderId, orderPayload);
  }
}
