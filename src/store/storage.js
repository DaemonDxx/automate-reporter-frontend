import {API} from "@/API";

export const ACTION_SEND_FILE = 'ACTION_SEND_FILE';
export const ACTION_DELETE_FILE = 'ACTION_DELETE_FILE';
export const ACTION_UPDATE_FILE_INFO = 'ACTION_UPDATE_FILE_INFO';

const MUTATION_ADD_FILE = 'MUTATION_ADD_FILE';
const MUTATION_DELETE_FILE = 'MUTATION_DELETE_FILE';
const MUTATION_SET_TIMER = 'MUTATION_SET_TIMER';
const MUTATION_UPDATE_FILE_INFO = 'MUTATION_UPDATE_FILE_INFO';

export const Storage = {
    state: {
        activeParsingFiles: [],
        timer_id: 0,
    },

    actions: {

        async [ACTION_SEND_FILE] (ctx, file) {
            try {
                const fileInfo = await API.Storage.SendFile(file);
                return fileInfo;
            } catch (e) {
                console.error(e);
                this._vm.$notify({
                    title: 'Ошибка загрузки файла',
                    text: e,
                    type: 'error',
                })
            }
        },

        async [ACTION_UPDATE_FILE_INFO] ({commit, state}, {_id, type}) {
            try {
                const fileInfo = await API.Storage.UpdateFileInfo(_id, type);
                commit(MUTATION_ADD_FILE, fileInfo);
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
            } catch (e) {
                console.error(e);
                this._vm.$notify({
                    title: 'Ошибка обновления данных о файле',
                    text: e,
                    type: 'error',
                })
            }
        },

        [ACTION_DELETE_FILE] ({commit}, _id) {
            commit(MUTATION_DELETE_FILE, _id);
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