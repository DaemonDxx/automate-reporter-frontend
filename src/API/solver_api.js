import {http} from "@/http";
import {PersonalSolveFailedError} from "../utils/errors/api/solver/PersonalSolveFailedError";
import {getErrorMessage} from "../utils/errors/GetErrorMessage";
import {GetOffsetsByError} from "../utils/errors/api/solver/GetOffsetsByError";

const URL_SOLVE = 'math/offset'

export async function Personal(query) {
    try {
        const response = await http.get(`${URL_SOLVE}/personal`, {
            params: query,
        });
        const offset = await response.data;
        return offset;
    } catch (e) {
        throw new PersonalSolveFailedError(getErrorMessage(e));
    }

}

export async function ByYear(query) {
    try {
        const response = await http.get(`${URL_SOLVE}/`, {
            params: query,
        });
        const offsets = await response.data;
        return offsets;
    } catch (e) {
        throw new GetOffsetsByError(getErrorMessage(e));
    }
}