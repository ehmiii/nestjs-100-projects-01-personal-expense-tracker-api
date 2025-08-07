import { Controller, Get, Post, Body, HttpCode, Param, } from '@nestjs/common';
import { LoginRequestDto } from './login-request.dto';
@Controller('auth')
export class AuthController {
    @Post('login')
    @HttpCode(200)
    login(@Body() requestDto: LoginRequestDto) {

    }

    @Post('signup')
    @HttpCode(201)
    signup(@Body() body: { email: string, password: string, firstName: string, lastName: string }) {

    }

    @Get('logout')
    @HttpCode(200)
    logout() { }
}