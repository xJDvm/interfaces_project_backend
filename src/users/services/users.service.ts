import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    // Crear el usuario
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);

    // Crear el perfil vacío vinculado al usuario
    const profile = new Profile();
    profile.user = savedUser;
    profile.firstname = '';
    profile.lastname = '';
    profile.birthdate = null; // Dejar birthdate vacío
    profile.gender = '';
    profile.country = '';
    profile.email = '';
    profile.password = '';
    profile.address = {
      street: '',
      city: '',
      state: '',
      country: '',
      postcode: 0,
    };

    await this.profileRepository.save(profile);

    return savedUser;
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
