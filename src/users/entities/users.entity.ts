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
import { EUserRoles } from '../enum';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'hairsalon_id',
    nullable: true,
  })
  hairSalonId: number;

  @Column({
    type: 'varchar',
    name: 'username',
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    name: 'password',
  })
  password: string;

  @Column({
    type: 'int',
    name: 'role',
    default: () => `${EUserRoles.USER}`,
  })
  role: number;

  @Column({
    type: 'varchar',
    name: 'firstname',
    nullable: true,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    name: 'lastname',
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    name: 'address',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    name: 'phone',
    nullable: true,
  })
  phone: string;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: string;

  @JoinColumn({ name: 'hairsalon_id' })
  @ManyToOne(() => HairSalon, (hairSalon: HairSalon) => hairSalon.users)
  hairSalon: HairSalon;

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];
}
