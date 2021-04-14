import {http} from '../http';
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

export async function CreateReport(newReport) {
    const response = await http.post(URL, newReport);
    return response.data;
}

export async function UpdateReport(report) {
    const response = await http.put(URL, {
        ...report
    });
    return response.data;
}

export async function DeleteReport(report) {
    const response = await http.delete(URL, {
        data: {
            reportID: report._id
        }
    });
    return response.data
}