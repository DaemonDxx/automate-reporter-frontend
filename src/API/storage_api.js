import {http} from "@/http";

const URL_UPLOAD = 'storage/upload';
const URL_FILE = 'storage/file';

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