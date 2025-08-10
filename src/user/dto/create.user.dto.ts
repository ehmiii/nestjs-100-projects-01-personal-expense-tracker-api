import { Expose, Exclude } from "class-transformer";
import { IsString, IsNotEmpty, Matches, IsEmail, MinLength } from "class-validator";
import { Match } from "../../utils/match.decorator";

export class CreateUserDto {
    @Expose()
    @IsString({ message: "Name should be string" })
    @IsNotEmpty()
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Name can only contains letters and spaces'
    })
    firstName: string;


    @Expose()
    @IsString({ message: "Name should be string" })
    @IsNotEmpty()
    @Matches(/^[A-Za-z\S]+$/, {
        message: "Name can only contains letters and spaces"
    })
    lastName: string;


    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @Expose()
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password minmum length should be 6' })
    password: string;

    @IsNotEmpty()
    @Match('password', { message: 'Confirm password do not match' })
    @Exclude({ toPlainOnly: true })
    confirmPassword: string; // Field for confirming password
}