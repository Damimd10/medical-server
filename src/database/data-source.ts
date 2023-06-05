import 'dotenv/config';
import { join } from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true, // Remove this for prod
  logging: false,
  entities: [join(__dirname, '/../**', '*.entity.{ts,js}')],
  subscribers: [],
});
