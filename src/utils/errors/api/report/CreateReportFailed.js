import {APIError} from "../APIError";

export class CreateReportFailed extends APIError {

    constructor(message) {
        super(
            'Создание отчета',
            message
        );

    }

}