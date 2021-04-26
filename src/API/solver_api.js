import {http} from "@/http";

const URL_SOLVE = 'math/offset'

export async function Personal(query) {
    const response = await http.get(`${URL_SOLVE}/personal`, {
        params: query,
    });
    const offset = await response.data;
    return offset;
}

export async function byYear(query) {
    const response = await http.get(`${URL_SOLVE}/`, {
        params: query,
    });
    const offsets = await response.data;
    return offsets;
}