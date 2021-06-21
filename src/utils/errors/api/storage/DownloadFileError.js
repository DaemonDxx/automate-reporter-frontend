import {APIError} from "../APIError";

export class DownloadFileError extends APIError {

    constructor(message) {
        super(
            'Ошибкаа скачивания файла',
            message
        );
    }

}