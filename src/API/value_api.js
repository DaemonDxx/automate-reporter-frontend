import {http} from "@/http";

const URL = 'value'

export async function Get(query) {
    const response = await http.get(URL, {
        params: query
    })
    const values = response.data;
    return values;
}

export async function Create(value) {
    const response = await http.post(URL, value);
    const newValue = await response.data;
    return newValue;
}

export async function Change(_id, v) {
    const response = await http.put(URL, {
        _id,
        v
    });
    const updatedValue = await response.data;
    return updatedValue;
}

export async function Delete(_id) {
    const response = await http.delete(`${URL}/${_id}`);
    const result = await response.data;
    return result;
}