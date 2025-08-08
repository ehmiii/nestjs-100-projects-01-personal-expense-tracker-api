import { Expose, Type } from 'class-transformer';

import { UserDto } from '../../user/dto/user.dto';
export class AuthResponseDto {
    @Expose()
    authToken: string;
    @Type(() => UserDto)
    user: UserDto;
}