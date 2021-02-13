import {API} from "@/API";


const ACTION_GET_FILES_BY_REPORT = "ACTION_GET_FILES_BY_REPORT";
const ACTION_SEND_FILE = "ACTION_SEND_FILE";


const MUTATION_SET_FILES = "MUTATION_SET_FILES";

export const Weekly = {

    state: {
        files: []
    },

    mutations: {
        [MUTATION_SET_FILES] (state, files) {
            state.files = files;
        }

    },

    actions: {
        async [ACTION_GET_FILES_BY_REPORT] ({commit}, reportID) {
            const files = await API.File.getFileByReport(reportID);
            commit(MUTATION_SET_FILES, files);
        },

        async [ACTION_SEND_FILE] (ctx, file) {
            const reportID = ctx.rootState.selectedReport._id;
          const response = await API.Storage.sendFile(file);
          await API.File.createFile(
              response.filename,
              reportID
          );
          await ctx.dispatch(ACTION_GET_FILES_BY_REPORT, reportID);
        }


    },

    getters: {

    }

}

export {ACTION_SEND_FILE, ACTION_GET_FILES_BY_REPORT}