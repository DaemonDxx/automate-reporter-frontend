import axios from "axios";


//const URL = `http://balans-help.ru:3000/`;

const URL = `http://localhost:3000/`;

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
}, (err) => {
    const {statusCode, message} = err.response.data;
    return Promise.reject(new Error(`${statusCode}: ${message}`));
})


export {http};