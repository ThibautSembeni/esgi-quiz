import { TypeOrmModule } from '@nestjs/typeorm';

export const databaseProviders = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'database',
    port: 5432,
    username: 'root',
    password: 'password',
    database: 'quiz',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
  }),
];
