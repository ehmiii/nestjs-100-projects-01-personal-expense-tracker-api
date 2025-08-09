import { CommonResposneDto } from "../common/dto/response.dto";

export function success<T>(data: T): CommonResposneDto<T> {
    return {
        status: 'success',
        data: data,

    }
}

export function failure<T>(error: T): CommonResposneDto<T> {
    return {
        status: 'failure',
        data: null,
        error: error,
    }
}