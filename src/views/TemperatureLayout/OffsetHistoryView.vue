<template>
  <v-row justify="center">
    <v-card max-width="960" class="mt-3">
      <v-card-text>
        <div class="pa-1">
          <span>
            Выберите два года для сравнения
          </span>
        </div>
        <year-selector
            :year-items="accessebleYear"
            v-on:update="getOffsetsByYear"
        />
        <v-divider class="mt-6 mb-3"/>
        <table-offsets
            ref="table"
            :offsets="offsets"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
            outlined
            color="green"
            class="white--text"
            @click="handlerClick"
        >
          <v-icon left>
            mdi-file-excel
          </v-icon>
          Скачать
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-row>
</template>

<script>
import {saveAs} from 'file-saver';
import {Departments} from "@/departments";
import {API} from "../../API";
import YearSelector from "../../components/TemperatureLayout/OffsetHistoryView/YearSelector";
import TableOffsets from "../../components/TemperatureLayout/OffsetHistoryView/TableOffsets";
import {REPORT_TYPES} from "../../TYPES_REPORT";

export default {
name: "OffsetHistoryView",
  components: {TableOffsets, YearSelector},
  data: () => {
    return {
      isProgressActive: false,
      offsets: [],
      accessebleYear: [],
    }
  },
  methods: {

    async getAccessebleYear() {
      const values = await API.Value.Get({
            type: 'Temperature',
            department: Departments.AE,
            month: 0,
      });
      return Array.from(new Set(values.map(item => item.year))).sort();
    },

    async getOffsetsByYear([year1, year2]) {
        this.isProgressActive = true;
        const offsets = await API.Solver.byYear({
          yearBefore: year1,
          yearNow: year2,
        });
        this.offsets = offsets;
        this.isProgressActive = false;
    },

    async handlerClick() {
      const arrayOfFile = await API.Report.Create({
        type: REPORT_TYPES.Offsets,
        payload: this.$refs.table.dataTable,
      });
      saveAs(new Blob(new Uint8Array(arrayOfFile),{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}));
      console.log(arrayOfFile);
    }

  },

  async beforeMount() {
   this.accessebleYear = await this.getAccessebleYear();
  },

}
</script>

<style lang="sass" scoped>

</style>