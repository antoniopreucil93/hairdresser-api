import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  public async getHairSalonOrders(hairSalonId: number) {
    return this.orderRepository.find({
      relations: ['user', 'service', 'hairSalon'],
      where: {
        hairSalonId,
      },
      order: { id: 'ASC' },
    });
  }

  public async getHairSalonTodayOrders(hairSalonId: number) {
    return this.orderRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.user', 'user')
      .leftJoinAndSelect('orders.service', 'service')
      .leftJoinAndSelect('orders.hairSalon', 'hairSalon')
      .where('orders.hairSalonId=:hairSalonId', { hairSalonId })
      .andWhere('DATE(orders.created_at)=DATE(NOW())')
      .orderBy('orders.id', 'ASC')
      .getMany();
  }

  public async getUserOrderForToday(
    userId: number,
    { hairSalonId }: { hairSalonId: number },
  ) {
    return this.orderRepository
      .createQueryBuilder('order')
      .where('order.userId=:userId', { userId })
      .andWhere('order.hairSalonId=:hairSalonId', { hairSalonId: +hairSalonId })
      .andWhere('DATE(created_at)=DATE(NOW())')
      .getOne();
  }

  async updateOrder(orderId: number, orderPayload) {
    const order = await this.orderRepository.findOne(orderId);

    if (!order) throw new NotFoundException('narudžba nije pronađena');

    return this.orderRepository.save({ ...order, ...orderPayload });
  }

  public async createOrder(orderPayload) {
    return this.orderRepository.save(orderPayload);
  }

  public async getUserOrders(userId: number) {
    return this.orderRepository.find({
      relations: ['user', 'service', 'hairSalon'],
      where: { userId },
    });
  }
}
