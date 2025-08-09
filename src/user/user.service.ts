import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Users } from './users.entity';
import { UserDto } from './dto/user.dto';
@Injectable()
export class UserService {
    constructor(private dataSource: DataSource) { }

    async getUserByEmail(email: string): Promise<Users | null> {
        const userRepository = this.dataSource.getRepository(Users);
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        return user;
    }


}