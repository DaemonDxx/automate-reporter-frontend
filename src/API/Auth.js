import {http} from "@/http";

const URL_AUTH = 'auth/login'
const URL_REG = 'user/'

export async function Registration(username, password, key) {
    const response = await http.post(URL_REG, {
        username,
        password,
        key,
    });
    return response.data;
}

export async function Login(username, password) {
    const response = await http.post(URL_AUTH, {
        username,
        password,
    });
    return response.data;
}