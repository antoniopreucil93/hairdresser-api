import { Service } from '../../services/entities/services.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Order } from '../../orders/entities/orders.entity';

@Entity({
  name: 'hair_salons',
})
export class HairSalon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    name: 'phone',
  })
  phone: string;

  @Column({
    type: 'varchar',
    name: 'address',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    name: 'city',
  })
  city: string;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: string;

  @OneToMany(() => Service, (service: Service) => service.hairSalon)
  services: Service[];

  @OneToMany(() => User, (user: User) => user.hairSalon)
  users: User[];

  @OneToMany(() => Order, (order: Order) => order.hairSalon)
  orders: Order[];
}
