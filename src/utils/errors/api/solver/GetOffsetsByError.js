import {APIError} from "../APIError";

export class GetOffsetsByError extends APIError {
    constructor(message) {
        super(
            'Получение данных за год',
            message
        );
    }
}