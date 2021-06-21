import {VueApp} from "../main";
import {API} from "../API";

export const ACTION_CREATE_REPORT = 'ACTION_CREATE_REPORT';

export const ReportStore = {
    state: {

    },

    actions: {
        async [ACTION_CREATE_REPORT] (ctx, payload) {
            try {
                const filename = await API.Report.Create(payload);
                return filename;
            } catch (e) {
                VueApp.handleError(e);
                return null;
            }
        },
    },
}