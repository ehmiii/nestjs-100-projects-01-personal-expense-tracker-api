import { Expose, Type } from 'class-transformer';

export class CommonResposneDto<T> {
    status: string;
    data: T | null;
    error?: T;
}