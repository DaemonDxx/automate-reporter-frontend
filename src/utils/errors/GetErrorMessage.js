export const getErrorMessage = async (error) => {
    if (error.response) {
        const data = await error.response.data;
        return data.message ? data.message : 'Сообщение от сервера не поступило';
    } else {
        return error.message;
    }
}