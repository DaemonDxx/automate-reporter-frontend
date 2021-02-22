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