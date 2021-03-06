import axios from "axios";

const host = process.env.HOST_API;

const URL = host?`http://${host}:3000/`: 'http://localhost:3000/';

const http = new axios.create({
    baseURL: URL,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
})

export {http};