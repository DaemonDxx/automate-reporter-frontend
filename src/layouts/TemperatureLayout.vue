<template>
  <v-container>
    <v-row>
      <v-col
        cols="3">
        <TFilterOption>
          <template v-slot:year-selector>
            <year-selector
              :year-items="years"
              :selected="selectYears"
              v-on:update="updateYear"
            >

            </year-selector>
          </template>
          <template v-slot:month-selector>
            <month-selector
                :active-month="arr"
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
export default {
  name: "TemperatureLayout",
  data: () => {
    return {
      arr: [],
      years: [2014,2015,2016],
      selectYears: [],
    }
  },
  components: {DepartmentSelector, YearSelector, MonthSelector, TFilterOption},
  methods: {
    updateYear(years) {
      this.selectYears = years;
    }
  }
}
</script>

<style scoped>

</style>