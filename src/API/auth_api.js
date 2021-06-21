import {http} from "@/http";
import {RegistrationFailedError} from "../utils/errors/api/auth/RegistrationFailedError";
import {getErrorMessage} from "../utils/errors/GetErrorMessage";
import {LoginFailedError} from "../utils/errors/api/auth/LoginFailedError";
import {UserInfoFailed} from "../utils/errors/api/auth/UserInfoFailed";

const URL_LOGIN = 'auth/login';
const URL_REGISTRATION = 'auth/registration';
const URL_USER = 'user';

export async function Registration(username, password, key) {
    try {
        const response = await http.post(URL_REGISTRATION, {
            username,
            password,
            key,
        });
        const user = await response.data;
        return user;
    } catch (e) {
        throw new RegistrationFailedError(await getErrorMessage(e));
    }

}

export async function Login(username, password) {
    try {
        const response = await http.post(URL_LOGIN, {
            username,
            password,
        });
        const token = await response.data;
        return token;
    } catch (e) {
        throw new LoginFailedError(await getErrorMessage(e));
    }

}

export async function UserInfo(_id) {
    try {
        const response = await http.get(`${URL_USER}/${_id}`);
        const user = await response.data;
        return user;
    } catch (e) {
        throw UserInfoFailed(await getErrorMessage(e));
    }

}