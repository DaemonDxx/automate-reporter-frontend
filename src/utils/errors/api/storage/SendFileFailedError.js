import {APIError} from "../APIError";

export class SendFileFailedError extends APIError {

    constructor(message) {
        super(
            'Отправка файла',
            message
        );
    }

}