import { Controller, Get, Post, Body, HttpCode, Param, } from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { SignupRequestDto } from './dto/sign-up-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('login')
    @HttpCode(200)
    async login(@Body() requestDto: LoginRequestDto): Promise<AuthResponseDto> {
        return this.authService.login(requestDto);
    }

    @Post('signup')
    @HttpCode(201)
    async signup(@Body() requestDto: SignupRequestDto): Promise<AuthResponseDto> {
        return this.authService.signup(requestDto);

    }

    @Get('logout')
    @HttpCode(200)
    async logout(): Promise<void> {
        return this.authService.logout();
    }
}