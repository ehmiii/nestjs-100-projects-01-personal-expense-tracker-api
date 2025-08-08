import { Expose } from 'class-transformer';
export class UserDto {
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;
    @Expose()
    id: string;
    @Expose()
    firstName: string;
    @Expose()
    lastName: string;
    @Expose()
    email: string;
}