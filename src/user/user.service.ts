import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Users } from './users.entity';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { instanceToInstance, plainToInstance } from 'class-transformer';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>) { }

    async getUserByEmail(email: string): Promise<Users | null> {
        return await this.userRepository.findOne({ where: { email: email.toLowerCase() } });
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
        const user = await this.getUserByEmail(createUserDto.email);

        if (user) {
            throw new ConflictException('User already exists')
        }

        let newUser = this.userRepository.create(createUserDto);
        newUser = await this.userRepository.save(newUser);
        return plainToInstance(UserDto, newUser, {
            excludeExtraneousValues: true,
        });
    }

    async getAllUsers() {
        return await this.userRepository.find();
    }
}