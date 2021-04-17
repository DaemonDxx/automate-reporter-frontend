import {http} from "@/http";

const URL_SOLVE = 'math/offset'

export async function Personal(query) {
    const response = await http.get(`${URL_SOLVE}/personal`, {
        params: query,
    });
    const offset = await response.data;
    return offset;
}