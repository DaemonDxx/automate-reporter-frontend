import Vue from 'vue'
import Vuex from 'vuex'
import {API} from '../API/index'
import {getArrayOfTypesReport} from "@/TYPES_REPORT";

Vue.use(Vuex)

const ACTION_GET_REPORTS = "ACTION_GET_REPORTS";
const ACTION_CREATE_REPORT = "ACTION_CREATE_REPORT";
const ACTION_SET_SELECTED_REPORT = "ACTION_SET_SELECTED_REPORT";

const MUTATION_UPDATE_REPORTS = "MUTATION_UPDATE_REPORTS";
const MUTATION_SET_SELECTED_REPORT = "MUTATION_SET_SELECTED_REPORT";

export default new Vuex.Store({
  state: {
    reports: [],
    selectedReport: undefined,
    filterQuery: {
      type: getArrayOfTypesReport(),
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      limit: 5,
      offset: 0
    }
  },

  mutations: {
    [MUTATION_UPDATE_REPORTS] (state, reports) {
      state.reports = reports;
    },

    [MUTATION_SET_SELECTED_REPORT] (state, report) {
      state.selectedReport = report;
    }
  },

  actions: {
    async [ACTION_GET_REPORTS] ({commit, state}) {
      const reports = await API.Report.GetReport(state.filterQuery);
      commit(MUTATION_UPDATE_REPORTS, reports);
    },

    async [ACTION_CREATE_REPORT] ({commit}, type) {
      const newReport = await API.Report.CreateReport(type);
      console.log(newReport);
      commit(MUTATION_SET_SELECTED_REPORT, newReport);
    },

    async [ACTION_SET_SELECTED_REPORT] ({commit}, report) {
      commit(MUTATION_SET_SELECTED_REPORT, report);
    }

  },

  getters: {
    reports: state => state.reports,
    selectedReport: state => state.selectedReport
  },
  modules: {
  }
})

export {ACTION_GET_REPORTS, ACTION_CREATE_REPORT, ACTION_SET_SELECTED_REPORT}
