import {http} from "@/http";

const URL = 'storage';
const URL_UPLOAD = `${URL}/upload`;
const URL_FILE = `${URL}/file`;

export async function SendFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await http.post(URL_UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (!response) return null;
        const fileModel = await response.data;
        return fileModel;
}

export async function UpdateFileInfo(_id, type) {
    const response = await http.post(URL_FILE, {
        _id,
        type
    });
    if (!response) return null;
    const file = await response.data;
    return file;
}

export async function GetFileInfo(_id) {
    const response = await http.get(`${URL_FILE}/${_id}`);
    if (!response) return null;
    const fileInfo = await response.data;
    return fileInfo;
}

const size = (obj) => {
    return Object.keys(obj).length;
}

export async function DownloadFile(filename) {
    const response = await http.get(`${URL}/${filename}`);
    if (!response) return null;
    const obj = await response.data;
    const uint = new Uint8Array(size(obj));
    for (const key of Object.keys(obj)) {
        uint[parseInt(key)] = obj[key];
    }
    return uint;
}