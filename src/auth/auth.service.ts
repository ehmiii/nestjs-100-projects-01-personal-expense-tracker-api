import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/user.entity';
import { LoginRequestDto } from './dto/login-request.dto';
import { SignupRequestDto } from './dto/sign-up-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async generateAuthToken(userDto: UserDto): Promise<string> {
        return await this.jwtService.sign({
            id: userDto.id,
            email: userDto.email,
        });
    }

    async validateCredentials(requestDto: LoginRequestDto): Promise<UserDto> {
        const user = await this.userService.getUserByEmail(requestDto.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        // Password validation logic would go here
        const isValidPassword = await bcrypt.compare(requestDto.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        return plainToInstance(UserDto, user);
    }

    async login(requestDto: LoginRequestDto): Promise<AuthResponseDto> {

        try {
            const userDto = await this.validateCredentials(requestDto);
            const authToken = await this.generateAuthToken(userDto);
            return plainToInstance(AuthResponseDto, {
                authToken,
                user: userDto
            });
        } catch (error) {

            throw error; // Re-throw the error to be handled by the caller

        } finally {

        }
    }

    async signup(requestDto: SignupRequestDto): Promise<AuthResponseDto> {

        try {
            const userDto = await this.userService.getUserByEmail(requestDto.email);
            if (userDto) {
                throw new BadRequestException(`User already exists with email ${requestDto.email}`);
            }
            const userRepository = await this.dataSource.getRepository(User);
            const newUser = userRepository.create();

            newUser.email = requestDto.email;
            newUser.firstName = requestDto.firstName;
            newUser.lastName = requestDto.lastName;
            newUser.password = requestDto.password;

            const createdUser = await userRepository.save(newUser);
            const createdUserDto = plainToInstance(UserDto, createdUser);
            const authToken = await this.generateAuthToken(createdUserDto);
            return plainToInstance(AuthResponseDto, {
                authToken,
                user: userDto
            },
            );
        } catch (error) {
            throw error; // Re-throw the error to be handled by the caller
        } finally {

        }

    }

    async logout(): Promise<void> { }
}