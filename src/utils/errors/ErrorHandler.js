import {APIError} from "./api/APIError";

export const errorHandler = function (error) {
    if (error instanceof APIError)
        this.$notify(error.toNotify())
    else
        this.$notify({
            title: 'Ошибка',
            text: 'Неизвестная ошибка',
            type: 'error',
        });
    console.error(error);
}