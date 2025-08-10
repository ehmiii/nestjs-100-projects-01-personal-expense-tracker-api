import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


import { Constants } from '../common/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserSubscriber } from '../user/user.subscriber';
import { UserModule } from 'src/user/user.module';


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
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService,],
})
export class AuthModule { }