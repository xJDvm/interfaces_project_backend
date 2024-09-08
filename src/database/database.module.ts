import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';
import { User } from 'src/users/entities/user.entity';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'elmejor10',
  database: 'db-interfaces',
  port: 5433,
});
client.connect();


const API_KEY = '123124123'
const API_KEY_PROD = 'PROD1231234123'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'elmejor10',
      database: 'db-interfaces',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule { }
