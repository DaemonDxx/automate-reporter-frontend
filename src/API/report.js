import {http} from "../http";

const URL = '/report'

export async function Create(data) {
    const response = await http.post(URL, data);
    return response.data;
}