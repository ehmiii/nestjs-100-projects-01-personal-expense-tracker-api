import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


import { Constants } from '../utils/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>(Constants.JWT_SECRET),
                expiresIn: configService.get<string>(Constants.JWT_EXPIRY),
            }),
            inject: [ConfigService]
        }),

    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }