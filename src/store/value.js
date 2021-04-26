import {API} from "@/API";

export const ACTION_GET_VALUE = 'ACTION_GET_VALUE';
export const ACTION_GET_AVAILABLE_YEAR = 'ACTION_GET_AVAILABLE_YEAR';
export const ACTION_SOLVE_PERSONAL_OFFSET = 'ACTION_SOLVE_OFFSET';
export const ACTION_SOLVE_OFFSETS_BY_YEAR =  'ACTION_SOLVE_OFFSETS_BY_YEAR';

const MUTATION_SET_OFFSETS = 'MUTATION_SET_OFFSETS';

export const Value = {
    state: {
        offsets: [],
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

        async [ACTION_SOLVE_PERSONAL_OFFSET] (ctx, query) {
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
        },

        async [ACTION_SOLVE_OFFSETS_BY_YEAR] ({commit}, query) {
            try {
                const offsets = await API.Solver.byYear(query);
                commit(MUTATION_SET_OFFSETS, offsets);
                console.table(offsets);
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
        [MUTATION_SET_OFFSETS] (state, offsets) {
            state.offsets = offsets;
        }
    },

    getters: {
        availableMonth: state => Array.from(new Set(state.offsets.map(el => el.month))),
    }
}