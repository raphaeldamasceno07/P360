import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { ReturnUserDto } from './dto/return-user.dto';
import { createPasswordHashed } from 'src/utils/password';

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

    await this.userRepository.save(newUser);

    const userWthoutPassword = { ...newUser, password: undefined };
    return userWthoutPassword;
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`Id: ${id} Not Found`);
    }

    return user;
  }
  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }

    return user;
  }
}
