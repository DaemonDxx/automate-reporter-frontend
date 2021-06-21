import {APIError} from "../APIError";

export class UserInfoFailed extends APIError {
    constructor(message) {
        super(
            'Ошибка получения данных',
            message
        );
    }
}