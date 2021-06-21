import {http} from "@/http";
import {GetValueError} from "../utils/errors/api/value/GetValueError";
import {getErrorMessage} from "../utils/errors/GetErrorMessage";

const URL = 'value'

export async function Get(query) {
    try {
        const response = await http.get(URL, {
            params: query
        })
        return response.data;
    } catch (e) {
        throw new GetValueError(await getErrorMessage(e));
    }
}
