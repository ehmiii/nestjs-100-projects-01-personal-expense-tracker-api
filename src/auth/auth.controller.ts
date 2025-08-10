import { Controller, Get, Post, Body, HttpCode, HttpStatus, } from '@nestjs/common';


import { LoginRequestDto } from './dto/login-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthService } from './auth.service';
import { CommonResposneDto } from 'src/common/dto/response.dto';
import { success, failure } from '../utils/response.util';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('login')
    @HttpCode(200)
    async login(@Body() requestDto: LoginRequestDto): Promise<CommonResposneDto<AuthResponseDto>> {
        try {
            const result = await this.authService.login(requestDto);
            return success(result);
        } catch (error) {
            console.log(error);
            return failure(error, error.statusCode | HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('signup')
    @HttpCode(201)
    async signup(@Body() createUserDto: CreateUserDto): Promise<CommonResposneDto<AuthResponseDto>> {
        try {
            const result = await this.authService.signup(createUserDto);
            return success(result);

        }
        catch (error) {
            return failure(error, error.statusCode | HttpStatus.INTERNAL_SERVER_ERROR);
        }



    }

    @Get('logout')
    @HttpCode(200)
    async logout(): Promise<void> {
        return this.authService.logout();
    }
}