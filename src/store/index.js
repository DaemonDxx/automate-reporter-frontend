import Vue from 'vue'
import Vuex from 'vuex'
import {VuexPersistence} from "vuex-persist";
import {StorageStore} from "./storageStore";
import {AuthStore} from "./authStore";
import {ReportStore} from "./reportStore";
import {SolverStore} from "./solverStore";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  mutations: {},

  actions: {},

  getters: {
    reports: state => state.reports,
    selectedReport: state => state.selectedReport
  },
  modules: {
    Auth: AuthStore,
    Storage: StorageStore,
    Report: ReportStore,
    Solver: SolverStore,
  },
  plugins: [new VuexPersistence({modules: ['Auth']}).plugin]
})
