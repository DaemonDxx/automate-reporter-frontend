import axios from "axios";
import { VueApp } from './main';
import {ACTION_LOGOUT} from "./store/auth";

const URL = `http://balans-help.ru:3000/`;

//const URL = `http://localhost:3000/`;

const http = new axios.create({
    baseURL: URL,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
})

http.interceptors.response.use((value) => {
    return Promise.resolve(value);
}, async (err) => {
    const {statusCode, message} = err.response.data;
    switch (statusCode) {
        case 401:
            if (err.request.responseURL === 'http://localhost:3000/auth/login') {
                VueApp.$notify({
                    type: 'error',
                    title: 'Вход не удался',
                    text: `Не верный логин или пароль`,
                });
                return Promise.reject(new Error('Не верный логин или пароль'));
            }

            await VueApp.$store.dispatch(ACTION_LOGOUT);
            await VueApp.$router.push('/auth');
            break;
        default:
            VueApp.$notify({
                type: 'error',
                title: 'Запрос не выполнен',
                text: `Код ошибки ${statusCode} - ${message}`,
            })
    }
    console.error(err);
    return Promise.resolve(null);
})


export {http};