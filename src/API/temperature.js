import {http} from "@/http";

const URL = 'temperature/'

export async function GetYears() {
    const response = await http.get(`${URL}year`);
    return response.data;
}

export async function ResolveOffset(year1, year2) {
    const response = await http.get(`${URL}offset`, {
        params: {
            year1,
            year2
        }
    });
    return response.data;
}

export async function ParseOffsetsOfFile(filename, options) {
    try {
        const response = await http.post(`${URL}file`,{
            filename,
            options
        });
        const statistic = await response.data;
        return {response: statistic};
    } catch (e) {
        return {err: e.response.data.message};
    }
}