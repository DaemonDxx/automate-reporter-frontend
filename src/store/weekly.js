import {API} from "@/API";


const ACTION_GET_FILES_BY_REPORT = "ACTION_GET_FILES_BY_REPORT";
const ACTION_SEND_FILE = "ACTION_SEND_FILE";
const ACTION_SET_ACTIVE_STATUS = "ACTION_SET_ACTIVE_STATUS";


const MUTATION_SET_FILES = "MUTATION_SET_FILES";
const MUTATION_UPDATE_STATUS = "MUTATION_UPDATE_STATUS";

export const Weekly = {

    state: {
        files: []
    },

    mutations: {
        [MUTATION_SET_FILES] (state, files) {
            state.files = files;
        },

        [MUTATION_UPDATE_STATUS] (state, updatedFile) {
            state.files = state.files.map((file) => {
               if (file.isActive && (file.department === updatedFile.department)) {
                   file.isActive = false;
                   return file;
               } else if (file._id === updatedFile._id) {
                   file.isActive = true;
                   return  file;
               } else {
                   return file;
               }

            });
        }

    },

    actions: {
        async [ACTION_GET_FILES_BY_REPORT] ({commit}, reportID) {
            const files = await API.File.getFileByReport(reportID);
            commit(MUTATION_SET_FILES, files);
        },

        async [ACTION_SEND_FILE] (ctx, file) {
            const response = await API.Storage.sendFile(file);
            return response;
        },

        async[ACTION_SET_ACTIVE_STATUS] ({commit}, fileID) {
          const updatedFile = await API.File.setActiveStatus(fileID);
          commit(MUTATION_UPDATE_STATUS, updatedFile);
        }


    },

    getters: {
        files: state => state.files,

        filesByDepartment: state => department => {
            return state.files.filter((item) => {
                return item.department === department
            });
        }
    }

}

export {ACTION_SEND_FILE, ACTION_GET_FILES_BY_REPORT, ACTION_SET_ACTIVE_STATUS}