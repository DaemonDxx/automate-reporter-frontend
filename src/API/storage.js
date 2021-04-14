import {http} from "@/http";

const URL = 'storage/upload'

export async function sendFile(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await http.post(URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const filename = await response.data;
        return {response: filename};
    } catch (e) {
        return {err: e.response.data.message}
    }

}