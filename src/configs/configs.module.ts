import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './configs.service';
import { ConfigController } from './configs.controller';
import { Config } from './config.entity'
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Config]),
    UsersModule
  ],
  providers: [ConfigService],
  controllers: [ConfigController]
})
export class ConfigsModule {}
