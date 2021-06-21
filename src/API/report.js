import {http} from "../http";
import {CreateReportFailed} from "../utils/errors/api/report/CreateReportFailed";
import {getErrorMessage} from "../utils/errors/GetErrorMessage";

const URL = '/report'

export async function Create(data) {
    try {
        const response = await http.post(URL, data);
        const filename = await response.data;
        return filename;
    } catch (e) {
        throw new CreateReportFailed(await getErrorMessage(e));
    }

}