import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const postgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: 5432,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logger: 'debug',
  keepConnectionAlive: true,
};
