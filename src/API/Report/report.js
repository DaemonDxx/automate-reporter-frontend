import {http} from '../../http';
import {getArrayOfTypesReport} from "@/TYPES_REPORT";

const URL = '/report'

export async function GetReportByID(id) {
    const response = await http.get(`${URL}/${id}`);
    const report = response.data;
    return report;
}

export async function GetReport(query) {
    const params = {
        type: query.type || getArrayOfTypesReport(),
        offset: query.offset || 0,
        limit: query.limit || 5,
        year : query.year || new Date().getFullYear(),
        month: query.month || new Date().getMonth()
    }
    const response = await http.get(URL, {
        params: params
    })
    return response.data;
}

export async function CreateReport(type) {
    const response = await http.post(URL, {
        type
    });
    console.log(response);
    return response.data;
}