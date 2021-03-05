<template>
  <v-container>
    <v-row>
      <v-col
        md="4"
        lg="3"
      >
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
                v-on:update="updateFilter"
            >
            </month-selector>
          </template>
          <template v-slot:department-selector>
            <department-selector
                :disabled="isDisabledDepartment"
                v-on:update="updateFilter"
            >

            </department-selector>
          </template>
        </TFilterOption>
      </v-col>
      <v-col
        md="8"
        lg="9"
      >
        <OffsetStatisticsView
          :data="sumOffsets(filter)"
        >

        </OffsetStatisticsView>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TFilterOption from "@/views/TemperatureLayout/TFilterOptionView";
import MonthSelector from "@/components/TemperatureLayout/MonthSelector";
import YearSelector from "@/components/TemperatureLayout/YearSelector";
import DepartmentSelector from "@/components/TemperatureLayout/DepartmentSelector";
import {mapActions, mapGetters} from "vuex";
import {ACTION_GET_OFFSETS, ACTION_GET_YEARS, ACTION_UPDATE_FILTER} from "@/store/temperature";
import OffsetStatisticsView from "@/views/TemperatureLayout/OffsetStatisticsView";
export default {
  name: "TemperatureLayout",
  components: {OffsetStatisticsView, DepartmentSelector, YearSelector, MonthSelector, TFilterOption},
  data: () => {
    return {
      filter: {
        months: [0,1,2,3,4,5,6,7,8,9,10,11],
        departments: [
          '"Алтайэнерго"',
          '"Бурятэнерго"',
          '"ГАЭС"',
          '"Красноярскэнерго"',
          '"Кузбассэнерго-РЭС"',
          '"Омскэнерго"',
          '"Хакасэнерго"',
          '"Читаэнерго"',
          'АО "Тываэнерго"',
        ]
      }
    }
  },
  methods: {
    ...mapActions([ACTION_GET_YEARS, ACTION_GET_OFFSETS, ACTION_UPDATE_FILTER]),

    async updateYear(indexesYear) {
      if (indexesYear.length == 2) {
        let year1 = this.accessYears[indexesYear[0]];
        let year2 = this.accessYears[indexesYear[1]];
        await this[ACTION_GET_OFFSETS]({year1, year2});
        this.month = this.accessMonth;

      }
    },

    updateFilter({field, value}) {
      this.filter[field] = value;
    }

  },

  computed: {
    ...mapGetters(['accessYears', 'accessMonth', 'sumOffsets']),

    isDisabledDepartment: function () {
      return this.accessMonth.length === 0;
    }
  },

  async created() {
    await this[ACTION_GET_YEARS]();
  }
}
</script>

<style scoped>

</style>