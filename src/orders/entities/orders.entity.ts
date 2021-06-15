import { HairSalon } from '../../hair-salons/entities/hair-salons.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from '../../services/entities/services.entity';
import { User } from '../../users/entities/users.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'hair_salon_id',
  })
  hairSalonId: number;

  @Column({
    type: 'int',
    name: 'service_id',
  })
  serviceId: number;

  @Column({
    type: 'int',
    name: 'user_id',
  })
  userId: number;

  @Column({
    type: 'varchar',
    name: 'note',
    nullable: true,
  })
  note: string;

  @Column({
    type: 'int',
    name: 'status',
    default: () => `1`,
  })
  status: number;

  @Column({
    type: 'varchar',
    name: 'datetime',
  })
  datetime: string;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: string;

  @JoinColumn({ name: 'hair_salon_id' })
  @ManyToOne(() => HairSalon, (hairSalon: HairSalon) => hairSalon.orders)
  hairSalon: HairSalon;

  @JoinColumn({ name: 'service_id' })
  @ManyToOne(() => Service, (service: Service) => service.orders)
  service: Service;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user: User) => user.orders)
  user: User;
}
