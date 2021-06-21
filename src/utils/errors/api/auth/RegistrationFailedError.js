import {APIError} from "../APIError";

export class RegistrationFailedError extends APIError {

    constructor(message) {
        super(
            'Ошибка регистрации',
            message
        );
    }

}