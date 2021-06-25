import axios from "axios";
import { VueApp } from './main';
import {ACTION_LOGOUT} from "./store/authStore";

//const URL = `http://balans-help.ru:3000/`;
const URL = `http://еронин.ru.com:3000/`;
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
    const response = err.response;
    const {statusCode} = response.data;
    if (statusCode === 401 && response.config.url !== "auth/login") {
        await VueApp.$store.dispatch(ACTION_LOGOUT);
        await VueApp.$router.push('/auth');
        return;
    }
    if (statusCode === 500) {
        VueApp.$notify({
            title: 'Ошибка выполнения запроса',
            text: 'Неизвестная ошибка от сервера',
            type: 'error',
        })
    }
    return Promise.reject(err);
})


export {http};