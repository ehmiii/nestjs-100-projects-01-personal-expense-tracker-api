import { Expose, Type } from 'class-transformer';
export class UserDto {
    @Expose()
    @Type(() => Date)
    createdAt: Date;

    @Expose()
    @Type(() => Date)
    updatedAt: Date;

    @Expose()
    @Type(() => Date)
    deletedAt?: Date;

    @Expose()
    id: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;
}