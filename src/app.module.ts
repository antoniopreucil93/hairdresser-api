import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { postgresConfig } from './app.config';
import { HairSalonsModule } from './hair-salons/hair-salons.module';
import { OrdersModule } from './orders/orders.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(postgresConfig),
    HairSalonsModule,
    OrdersModule,
    ServicesModule,
  ],
})
export class AppModule {}
