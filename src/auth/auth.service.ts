import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      // Verifica si existe el usuario
      const existingUser = await this.usersService.findOneByEmail(registerDto.email);

      //OPCIONAL VERIFICA SI YA HAY MAS DE 1
      const total = await this.usersService.findAll();

      if (total.length >= 2) {
        throw new BadRequestException('No se pueden registrar mas usuarios');
      } else {
        if (existingUser) {
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

  async login( loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Usuario no existe');

    } else {

      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');

      } else {
        const payload = { email: user.email, sub: user.id };
        const token = await this.jwtService.signAsync(payload);
        return {
          access_token: token,
          user: {
            email: user.email,
            id: user.id
          }
        };
      }
    }
  }
}
