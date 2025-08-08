import { Exclude, } from 'class-transformer';

export class SignupRequestDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    @Exclude({ toPlainOnly: true })
    confirmPassword: string; // Field for confirming password
}