import {API} from "@/API";

const ACTION_GET_YEARS = 'ACTION_GET_YEARS';
const ACTION_GET_OFFSETS = 'ACTION_GET_OFFSETS';

const MUTATION_SET_YEARS = 'MUTATION_SET_YEARS';
const MUTATION_SET_OFFSETS = 'MUTATION_SET_OFFSETS';

export const Temperature = {
    state: {
        accessYears: [],
        offsets: [],
    },

    actions: {
        async [ACTION_GET_YEARS] ({commit}) {
            const years = await API.Temperature.GetYears();
            commit(MUTATION_SET_YEARS, years);
        },

        async [ACTION_GET_OFFSETS] ({commit}, {year1, year2}) {
            if (year1 > year2) {
                let t = year2;
                year2 = year1;
                year1 = t;
            }
            const response = await API.Temperature.ResolveOffset(year1, year2);
            commit(MUTATION_SET_OFFSETS, response);
        }
    },

    mutations: {
        [MUTATION_SET_YEARS] (state, years) {
            state.accessYears = years;
        },
        [MUTATION_SET_OFFSETS] (state, offsets) {
            state.offsets = offsets;
        },
    },

    getters: {
        accessYears: state => state.accessYears,
        accessMonth: (state) => {
            const accessMonth = new Set();
            for (const item of state.offsets) {
                accessMonth.add(item.month);
            }
            return Array.from(accessMonth);
        },
    }
}

export {ACTION_GET_YEARS, ACTION_GET_OFFSETS}