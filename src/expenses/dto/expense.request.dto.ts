import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class AddExpenseReqeustDto {
    @IsNotEmpty()
    @IsString({ message: 'Title must be string' })
    title: string;


    @MinLength(6, { message: 'Descrption should be minimum 3' })
    @IsString({ message: 'Descrption must be string' })
    description: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber({}, { message: "Price should be in decimals" })
    price: string;
}