import {API} from "@/API";
import {VueApp} from "../main";
import {saveAs} from 'file-saver';

export const ACTION_SEND_FILE = 'ACTION_SEND_FILE';
export const ACTION_DELETE_FILE = 'ACTION_DELETE_FILE';
export const ACTION_DOWNLOAD_FILE = 'ACTION_DOWNLOAD_FILE';

const MUTATION_ADD_FILE = 'MUTATION_ADD_FILE';
const MUTATION_DELETE_FILE = 'MUTATION_DELETE_FILE';
const MUTATION_SET_TIMER = 'MUTATION_SET_TIMER';
const MUTATION_UPDATE_FILE_INFO = 'MUTATION_UPDATE_FILE_INFO';

export const StorageStore = {
    state: {
        activeParsingFiles: [],
        timer_id: 0,
    },

    actions: {

        async [ACTION_SEND_FILE] ({ commit, state }, {file, type}) {
            try {
                const fileInfo = await API.Storage.SendFile(file);
                const updatedFileInfo = await API.Storage.UpdateFileInfo(fileInfo._id, type);
                commit(MUTATION_ADD_FILE, updatedFileInfo);
                if (state.timer_id === 0) {
                    const timer_id = setInterval(async () => {
                        const files = state.activeParsingFiles.filter(item => item.result === 'InProgress');

                        if (files.length === 0) {
                            clearInterval(timer_id);
                            commit(MUTATION_SET_TIMER, 0);
                        }

                        for (const file of files) {
                            const updatedFileInfo = await API.Storage.GetFileInfo(file._id);
                            commit(MUTATION_UPDATE_FILE_INFO, updatedFileInfo);
                        }
                    },2000);
                    commit(MUTATION_SET_TIMER, timer_id);
                }
                return !!updatedFileInfo;
            } catch (e) {
                VueApp.handleError(e);
                return false;
            }
        },

        [ACTION_DELETE_FILE] ({commit}, _id) {
            commit(MUTATION_DELETE_FILE, _id);
        },

        async [ACTION_DOWNLOAD_FILE] (ctx, filename) {
            try {
                const arrayOfBuffer = await API.Storage.DownloadFile(filename);
                saveAs(new Blob([arrayOfBuffer],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}));
                return true;
            } catch (e) {
                VueApp.handleError(e);
                return false;
            }
        }
    },

    mutations: {
        [MUTATION_DELETE_FILE] (state, _id) {
            state.activeParsingFiles = state.activeParsingFiles.filter(item => item._id !== _id)
        },

        [MUTATION_ADD_FILE] (state, fileInfo) {
            state.activeParsingFiles.push(fileInfo);
        },

        [MUTATION_SET_TIMER] (state, timer_id) {
            state.timer_id = timer_id;
        },

        [MUTATION_UPDATE_FILE_INFO] (state, fileInfo) {
            const index = state.activeParsingFiles.findIndex(item => item._id === fileInfo._id);
            state.activeParsingFiles[index].result = fileInfo.result;
        }
    },

    getters: {
        isShowDialog: state => state.activeParsingFiles.length != 0,
        activeParsingFiles: state => state.activeParsingFiles,
    }
}