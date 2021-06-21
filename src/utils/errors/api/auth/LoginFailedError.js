import {APIError} from "../APIError";

export class LoginFailedError extends APIError {

    constructor(message) {
        super(
            'Ошибка входа',
            message,
        );
    }

}