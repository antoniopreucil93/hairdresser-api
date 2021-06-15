import { HairSalon } from '../../hair-salons/entities/hair-salons.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/orders.entity';

@Entity({
  name: 'services',
})
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'hair_salon_id',
  })
  hairSalonId: number;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @Column({
    type: 'decimal',
    name: 'price',
  })
  price: number;

  @Column({
    type: 'int',
    name: 'duration_in_minutes',
    nullable: true,
  })
  durationInMinutes: number;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: string;

  @JoinColumn({ name: 'hair_salon_id' })
  @ManyToOne(() => HairSalon, (hairSalon: HairSalon) => hairSalon.services)
  hairSalon: HairSalon;

  @OneToMany(() => Order, (order: Order) => order.service)
  orders: Order[];
}
