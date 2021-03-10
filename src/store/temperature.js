import {API} from "@/API";

const ACTION_GET_YEARS = 'ACTION_GET_YEARS';
const ACTION_GET_OFFSETS = 'ACTION_GET_OFFSETS';
const ACTION_UPDATE_FILTER = 'ACTION_UPDATE_FILTER';
const ACTION_PARSE_VALUE_FROM_FILE = 'ACTION_PARSE_VALUE_FROM_FILE';
const ACTION_CLEAR_OFFSETS = 'ACTION_CLEAR_OFFSETS';

const MUTATION_SET_YEARS = 'MUTATION_SET_YEARS';
const MUTATION_SET_OFFSETS = 'MUTATION_SET_OFFSETS';
const MUTATION_UPDATE_FILTER = 'MUTATION_UPDATE_FILTER';

export const Temperature = {
    state: {
        accessYears: [],
        offsets: {},
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
            const offsets = {};
            for (const item of response) {
                const fieldName = item.department;
                const values = item.offsets;
                offsets[fieldName] = values;
            }
            commit(MUTATION_SET_OFFSETS, offsets);
        },

        async [ACTION_PARSE_VALUE_FROM_FILE] (ctx, filename) {
            const response = await API.Temperature.ParseOffsetsOfFile(
                filename, {
                    yearStart: 2014,
                    yearEnd: 2021,
                    isUpdateOldValue: true
                }
            );
            return response;
        },

        [ACTION_UPDATE_FILTER]({commit}, payload) {
            commit(MUTATION_UPDATE_FILTER, payload);
        },

        [ACTION_CLEAR_OFFSETS] ({commit}) {
            commit(MUTATION_SET_OFFSETS, []);
        }
    },

    mutations: {
        [MUTATION_SET_YEARS] (state, years) {
            state.accessYears = years;
        },
        [MUTATION_SET_OFFSETS] (state, offsets) {
            state.offsets = {};
            state.offsets = offsets;
        },
        [MUTATION_UPDATE_FILTER] (state, {filter, value}) {
            if (filter === 'departments') {
                state.filter_departments = value;
            } else {
                state.filter_months = value;
            }
        }
    },

    getters: {
        accessYears: state => state.accessYears,
        accessMonth: (state) => {
            if (Object.keys(state.offsets).length === 0) {
                return [];
            }
            const accessMonth = new Set();
            for (const item of Object.keys(state.offsets)) {
                for (const offset of state.offsets[item]) {
                    accessMonth.add(offset.month);
                }
                return Array.from(accessMonth)
            }
        },

        sumOffsets: (state) => (filters) => {
            let result = [];
            if (Object.keys(state.offsets).length === 0) {
                return result;
            }
            const intl = Intl.NumberFormat('ru-RU', )
            const all = {
                receptionBefore: 0,
                receptionNow: 0,
                offset: 0,
                tempWinter: 0,
                tempSummer: 0,
            }
            for (const department of filters.departments) {
                const resultDepartment = {
                    receptionBefore: 0,
                    receptionNow: 0,
                    offset: 0,
                    tempWinter: 0,
                    tempSummer: 0,
                }
                for (const month of filters.months) {
                    const offset = state.offsets[department][month];
                    if (!offset) break;
                    resultDepartment.offset += offset.offset;
                    resultDepartment.receptionBefore += offset.receptionBefore;
                    resultDepartment.receptionNow += offset.receptionNow;
                    if (month < 4 || month > 9) {
                        resultDepartment.tempWinter += offset.tempNow - offset.tempBefore;
                    } else {
                        resultDepartment.tempSummer += offset.tempNow - offset.tempBefore;
                    }
                }
                all.receptionBefore += resultDepartment.receptionBefore
                all.receptionNow += resultDepartment.receptionNow
                all.offset += resultDepartment.offset
                resultDepartment.tempWinter = intl.format(resultDepartment.tempWinter / filters.months.length);
                resultDepartment.tempSummer = intl.format(resultDepartment.tempSummer / filters.months.length)
                resultDepartment.offset = intl.format(resultDepartment.offset);
                resultDepartment.receptionNow = intl.format(resultDepartment.receptionNow);
                resultDepartment.receptionBefore = intl.format(resultDepartment.receptionBefore);
                result.push({
                    department,
                    ...resultDepartment
                });
            }
            all.receptionBefore = intl.format(all.receptionBefore);
            all.receptionNow = intl.format(all.receptionNow);
            all.offset = intl.format(all.offset);
            result.push({
                department: 'Итого',
                ...all,
            })
            return result;
        }
    }
}

export {ACTION_GET_YEARS, ACTION_GET_OFFSETS, ACTION_UPDATE_FILTER, ACTION_PARSE_VALUE_FROM_FILE, ACTION_CLEAR_OFFSETS}