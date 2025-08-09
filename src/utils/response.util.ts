import { HttpException, HttpStatus } from "@nestjs/common";
import { CommonResposneDto } from "../common/dto/response.dto";

export function success<T>(data: T): CommonResposneDto<T> {
    return {
        status: 'success',
        data: data,

    }
}

export function failure<T>(error: any, statusCode: HttpStatus = HttpStatus.BAD_REQUEST): CommonResposneDto<T> {
    throw new HttpException(
        {
            status: 'failure',
            data: null,
            error: error.response || error,
        },
        statusCode,
    );
}