import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSubscriber } from './user.subscriber';
import { Users } from './users.entity';

@Module({
    // imports: [Users],
    imports: [TypeOrmModule.forFeature([Users, UserSubscriber])],
    controllers: [UserController],
    providers: [UserService, UserSubscriber],
    exports: [UserService, UserSubscriber]
})
export class UserModule { }