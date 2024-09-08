import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService) { }

  async register(registerDto: RegisterDto) {
    try {
      // Verifica si existe el usuario
      const user = await this.usersService.findOneByEmail(registerDto.email);

      //OPCIONAL VERIFICA SI YA HAY MAS DE 1
      const total = await this.usersService.findAll();

      if (total.length >= 2) {
        throw new BadRequestException('No se pueden registrar mas usuarios');
      } else {
        if (user) {
          throw new BadRequestException('User already exists');
        } else {
          const hashedPassword = await bcrypt.hash(registerDto.password, 10);
          const newUser = { ...registerDto, password: hashedPassword };
          return await this.usersService.create(newUser);
        }
      }


    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  login() {
    return 'Login';
  }
}
