import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


import { Constants } from '../common/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';


@Module({
    imports: [
        JwtModule.registerAsync({
            // imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>(Constants.JWT_SECRET),
                expiresIn: configService.get<string>(Constants.JWT_EXPIRY),
            }),
            inject: [ConfigService]
        }),

    ],
    controllers: [AuthController],
    providers: [AuthService, UserService],
})
export class AuthModule { }