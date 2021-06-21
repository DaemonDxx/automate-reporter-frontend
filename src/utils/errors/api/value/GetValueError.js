import {APIError} from "../APIError";

export class GetValueError extends APIError {
    constructor(message) {
        super(
            'Ошибка получения данных',
            message
        );
    }
}