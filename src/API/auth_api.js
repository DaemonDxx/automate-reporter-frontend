import {http} from "@/http";

const URL_LOGIN = 'auth/login';
const URL_REGISTRATION = 'auth/registration';
const URL_USER = 'user';

export async function Registration(username, password, key) {
    const response = await http.post(URL_REGISTRATION, {
        username,
        password,
        key,
    });
    if (!response) return null;
    const user = await response.data;
    return user;
}

export async function Login(username, password) {
    const response = await http.post(URL_LOGIN, {
        username,
        password,
    });
    if (!response) return null;
    const token = await response.data;
    return token;
}

export async function UserInfo(_id) {
    const response = await http.get(`${URL_USER}/${_id}`);
    if (!response) return null;
    const user = await response.data;
    return user;
}