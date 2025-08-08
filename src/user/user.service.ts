import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
@Injectable()
export class UserService {
    constructor(private dataSource: DataSource) { }

    async getUserByEmail(email: string): Promise<User | null> {
        const userRepository = this.dataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        return user;

    }
}