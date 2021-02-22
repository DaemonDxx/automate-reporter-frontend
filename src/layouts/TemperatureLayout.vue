<template>
  <v-container>
    <v-row>
      <v-col
        cols="3">
        <TFilterOption>
          <template v-slot:year-selector>
            <year-selector
              :year-items="accessYears"
              v-on:update="updateYear"
            >

            </year-selector>
          </template>
          <template v-slot:month-selector>
            <month-selector
                :active-month="accessMonth"
            >
            </month-selector>
          </template>
          <template v-slot:department-selector>
            <department-selector>

            </department-selector>
          </template>
        </TFilterOption>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TFilterOption from "@/views/TemperatureLayout/TFilterOption";
import MonthSelector from "@/components/TemperatureLayout/MonthSelector";
import YearSelector from "@/components/TemperatureLayout/YearSelector";
import DepartmentSelector from "@/components/TemperatureLayout/DepartmentSelector";
import {mapActions, mapGetters} from "vuex";
import {ACTION_GET_OFFSETS, ACTION_GET_YEARS} from "@/store/temperature";
export default {
  name: "TemperatureLayout",
  data: () => {
    return {
      arr: [0,1,2],
    }
  },
  components: {DepartmentSelector, YearSelector, MonthSelector, TFilterOption},
  methods: {
    ...mapActions([ACTION_GET_YEARS, ACTION_GET_OFFSETS]),

    async updateYear(indexesYear) {
      if (indexesYear.length == 2) {
        let year1 = this.accessYears[indexesYear[0]];
        let year2 = this.accessYears[indexesYear[1]];
        await this[ACTION_GET_OFFSETS]({year1, year2});
      }
    }
  },

  computed: {
    ...mapGetters(['accessYears', 'accessMonth'])
  },

  async created() {
    await this[ACTION_GET_YEARS]();
  }
}
</script>

<style scoped>

</style>