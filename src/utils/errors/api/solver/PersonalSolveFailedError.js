import {APIError} from "../APIError";

export class PersonalSolveFailedError extends APIError {
    constructor(message) {
        super(
            'Расчет',
            message,
        );
    }
}