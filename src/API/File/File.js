import {http} from "@/http";

const URL = '/file'

export async function getFileByReport(reportID) {
    const response = await http.get(URL, {
        params: {
            report: reportID
        }
    });
    return response.data;
}

export async function createFile(filename, reportID) {
    const response = await http.post(URL, {
        filename,
        id_report: reportID
    });
    return response;
}

export async function getFilesByReport(report) {
    const response = await http.get(URL, {
        params: {
            report: report
        }
    });
    return response.data;
}

