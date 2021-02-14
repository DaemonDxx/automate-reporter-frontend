<template>
  <v-app >
    <v-app-bar app>
        <div class="mr-3">
          icon
        </div>
        <v-btn class="ml-4 mr-4">
          Инструкция
        </v-btn>
      <router-link to="/report">
        ТУда
      </router-link>
      <v-btn class="ml-4 mr-4">
          Предложения
        </v-btn>
        <v-spacer>

        </v-spacer>
        <v-btn>
          Выход
        </v-btn>

    </v-app-bar>
    <v-main class="grey">
      <v-container>
        <v-row>
          <v-col
            cols="3"
          >
            <v-sheet class="rounded-lg" max-height="500px">
              <v-list-item
                class="flex justify-center"
              >
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item v-if="selectedReport">
                <v-list-item-content>
                  <v-list-item-title>
                    {{selectedReport.type}}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{selectedReport.description}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action-text>
                  {{`${selectedReport.year}.${selectedReport.month+1}.${selectedReport.day}`}}
                </v-list-item-action-text>
              </v-list-item>

              <v-list-item v-else
                           three-line
                            disabled
              >
                <span>
                  Выберете отчет для просмотра
                </span>
              </v-list-item>

              <v-divider></v-divider>
              <v-list
              dense
              two-line
              >
                <v-list-item-group>
                  <v-list-item
                      v-for="item in reports"
                      :key="item._id"
                      @click="selectReport(item)"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{item.type}}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{item.description}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action-text>
                      {{`${item.year}.${item.month+1}.${item.day}`}}
                    </v-list-item-action-text>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-sheet>
          </v-col>
          <v-col
            cols="9"
          >
            <v-row>
              <v-col cols="12">
                <ReportOption
                  :report="selectedReport"
                  v-on:new-report="selectReport"
                >

                </ReportOption>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <router-view>

                </router-view>
              </v-col>

            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import {
  ACTION_GET_REPORTS, ACTION_RESET_SELECTED_REPORT,
  ACTION_SET_SELECTED_REPORT,
  ACTION_UPDATE_FIELD_IN_REPORT
} from "@/store";
import {mapActions, mapGetters} from "vuex";
import {getArrayOfTypesReport} from '../TYPES_REPORT';
import ReportOption from "@/components/ReportOption";

export default {
  name: "MainLayout",
  components: {
    ReportOption,
  },
  data: () => {
    return {
      types: getArrayOfTypesReport(),
      modalCreateReport: false
    }
  },
  methods: {
    selectReport(report) {
      if (report._id !== this.selectedReport?._id && this.$route.params.id !== report._id) {
        this[ACTION_SET_SELECTED_REPORT](report._id);
        this.$router.push({name: 'weekly', params: {id: report._id}});
      } else if (report._id === this.selectedReport?._id) {
        this[ACTION_RESET_SELECTED_REPORT]();
        this.$router.push('/report');
      }
    },

    ...mapActions([
        ACTION_GET_REPORTS,
        ACTION_SET_SELECTED_REPORT,
        ACTION_UPDATE_FIELD_IN_REPORT,
        ACTION_RESET_SELECTED_REPORT
    ]),
  },
  computed: {
    ...mapGetters(['reports', "selectedReport"])
  },
  async created() {
    await this.$store.dispatch(ACTION_GET_REPORTS);
  }
}
</script>

<style scoped>

</style>