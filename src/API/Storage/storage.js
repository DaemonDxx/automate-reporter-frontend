import {http} from "@/http";

const URL = 'file/upload'

export async function sendFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await http.post(URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}