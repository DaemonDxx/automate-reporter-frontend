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

export async function setActiveStatus(fileID) {
    const response = await http.put(URL, {
        fileID
    });
    return response.data;
}

