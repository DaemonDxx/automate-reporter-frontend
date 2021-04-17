import {API} from "@/API";

export const ACTION_GET_VALUE = 'ACTION_GET_VALUE';
export const ACTION_GET_AVAILABLE_YEAR = 'ACTION_GET_AVAILABLE_YEAR';
export const ACTION_SOLVE_OFFSET = 'ACTION_SOLVE_OFFSET';

export const Value = {
    state: {

    },

    actions: {
        async [ACTION_GET_VALUE] (ctx, query) {
            try {
                const values = await API.Value.Get(query);
                return values;
            } catch (e) {
                console.error(e);
                this._vm.$notify({
                    title: 'Ошибка получения значения',
                    text: e,
                    type: 'error',
                });
            }
        },

        async [ACTION_SOLVE_OFFSET] (ctx, query) {
            try {
                const offset = await API.Solver.Personal(query);
                return offset;
            } catch (e) {
                console.error(e);
                this._vm.$notify({
                    title: 'Ошибка получения значения',
                    text: e,
                    type: 'error',
                });
            }
        }
    },

    mutations: {

    },

    getters: {

    }
}