import {http} from "@/http";

const URL = 'value'

export async function Get(query) {
    const response = await http.get(URL, {
        params: query
    })
    if (!response) return null;
    const values = response.data;
    return values;
}

export async function Create(value) {
    const response = await http.post(URL, value);
    if (!response) return null;
    const newValue = await response.data;
    return newValue;
}

export async function Change(_id, v) {
    const response = await http.put(URL, {
        _id,
        v
    });
    if (!response) return null;
    const updatedValue = await response.data;
    return updatedValue;
}

export async function Delete(_id) {
    const response = await http.delete(`${URL}/${_id}`);
    if (!response) return null;
    const result = await response.data;
    return result;
}