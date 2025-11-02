import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { hash } from 'bcrypt';
import { ReturnUserDto } from './dto/return-user.dto';
import { createPasswordHashed } from 'src/utils/hashPassword';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const hashedPassword = createPasswordHashed(createUserDto.password);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: await hashedPassword,
    });

    this.userRepository.save(newUser);

    const userWthoutPassword = { ...newUser, password: undefined };
    return userWthoutPassword;
  }
}
