import {API} from "../API";
import {VueApp} from "../main";
import {getErrorMessage} from "../utils/errors/GetErrorMessage";
import {Departments} from "../departments";

export const ACTION_PERSONAL_SOLVE = 'ACTION_PERSONAL_SOLVE';
export const ACTION_OFFSETS_BY_YEAR = 'ACTION_OFFSETS_BY_YEAR';
export const ACTION_GET_ACCESSES_YEAR = 'ACTION_GET_ACCESSES_YEAR';


const MUTATION_PUSH_PERSONAL_SOLVE = 'MUTATION_PUSH_PERSONAL_SOLVE';

export const SolverStore = {
    state: {
        historyPersonalSolve: [],
    },

    actions: {
        async [ACTION_PERSONAL_SOLVE] ({commit}, payload) {
            try {
                const solver = await API.Solver.Personal(payload);
                commit(MUTATION_PUSH_PERSONAL_SOLVE, solver);
                return solver;
            } catch (e) {
                VueApp.handleError(e);
                return 0;
            }
        },

        async [ACTION_OFFSETS_BY_YEAR] (ctx, payload) {
            try {
                const offsets = await API.Solver.ByYear(payload);
                return offsets;
            } catch (e) {
                VueApp.handleError(e);
                return [];
            }
        },

        async [ACTION_GET_ACCESSES_YEAR] () {
            try {
                const values = await API.Value.Get({
                    type: 'Temperature',
                    department: Departments.AE,
                    month: 0,
                });
                return Array.from(new Set(values.map(item => item.year))).sort();
            } catch (e) {
                VueApp.handleError(e);
                return [];
            }
        }

    },

    mutations: {
        [MUTATION_PUSH_PERSONAL_SOLVE] (state, solver) {
            if (state.historyPersonalSolve.length > 9) {
                const result = [...state.historyPersonalSolve];
                result.shift()
                result.push(solver);
                state.historyPersonalSolve = result;
            }
        }
    }
}