import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { ProfileService } from './services/profile.service';

import { UsersController } from './controllers/users.controller';
import { ProfileController } from './controllers/profile.controller';

import { Users } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Profile])
  ],
  controllers: [UsersController, ProfileController],
  providers: [UsersService, ProfileService],
  exports: [UsersService]
})
export class UsersModule {}
