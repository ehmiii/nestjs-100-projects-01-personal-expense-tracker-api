import { IsString, Matches, IsEmail, MinLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class SignupRequestDto {
    @Expose()
    @IsString({ message: "Name should be string" })
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Name can only contains letters and spaces'
    })
    firstName: string;
    @Expose()
    @IsString({ message: "Name should be string" })
    @Matches(/^[A-Za-z\S]+$/, {
        message: "Name can only contains letters and spaces"
    })
    lastName: string;
    @Expose()
    @IsEmail()
    email: string;
    @Expose()
    @IsString()
    @MinLength(6, { message: 'Minmum length should be 6' })
    password: string;
    @Exclude({ toPlainOnly: true })
    confirmPassword: string; // Field for confirming password
}