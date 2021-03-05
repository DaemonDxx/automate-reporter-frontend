import {http} from "@/http";

const URL_AUTH = 'auth/login'
const URL_REG = 'user/'

export async function Registration(username, password, key) {
    try {
        const response = await http.post(URL_REG, {
            username,
            password,
            key,
        });
        if (response.status === 201) {
            const user = await response.data;
            return {err: null, response: user}
        } else {
            return {err: `Запрос завершился со статусом ${response.status}`}
        }
    } catch (e) {
        return {err: `Ошибка ${e.message}`}
    }
}

export async function Login(username, password) {
    try {
        const response = await http.post(URL_AUTH, {
            username,
            password,
        });
        if (response.status === 201) {
            const payload = await response.data;
            return {err: null, response: payload}
        } else {
            return {err: `Запрос завершился со статусом ${response.status}`}
        }
    } catch (e) {
        return {err: `Ошибка ${e.message}`}
    }
}