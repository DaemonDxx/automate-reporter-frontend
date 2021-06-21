import {http} from "@/http";
import {SendFileFailedError} from "../utils/errors/api/storage/SendFileFailedError";
import {getErrorMessage} from "../utils/errors/GetErrorMessage";
import {DownloadFileError} from "../utils/errors/api/storage/DownloadFileError";

const URL = 'storage';
const URL_UPLOAD = `${URL}/upload`;
const URL_FILE = `${URL}/file`;

export async function SendFile(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await http.post(URL_UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (e) {
        throw new SendFileFailedError(getErrorMessage(e));
    }
}

export async function UpdateFileInfo(_id, type) {
    try {
        const response = await http.post(URL_FILE, {
            _id,
            type
        });
        return response.data;
    } catch (e) {
        throw new SendFileFailedError(getErrorMessage(e));
    }
}

export async function GetFileInfo(_id) {
    const response = await http.get(`${URL_FILE}/${_id}`);
    const fileInfo = await response.data;
    return fileInfo;
}

export async function DownloadFile(filename) {
    try {
        const response = await http.get(`${URL}/${filename}`);
        const obj = await response.data;
        const uint = transformToUint8Array(obj);
        return uint;
    } catch (e) {
        throw new DownloadFileError(getErrorMessage(e));
    }

}

const transformToUint8Array = (response) => {
    const uint = new Uint8Array(size(response));
    for (const key of Object.keys(response)) {
        uint[parseInt(key)] = response[key];
    }
    return uint;
}

const size = (obj) => {
    return Object.keys(obj).length;
}