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
            <v-progress-linear
              :active="isProgressActive"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
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
        <TTableOffsets
            :data="sumOffsets(filter)"
        >
        </TTableOffsets>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TTableOffsets from "@/components/TemperatureLayout/TTableOffsets";
import DepartmentSelector from "@/components/TemperatureLayout/DepartmentSelector";
import YearSelector from "@/components/TemperatureLayout/YearSelector";
import MonthSelector from "@/components/TemperatureLayout/MonthSelector";
import TFilterOption from "@/views/TemperatureLayout/TFilterOptionView";
import {mapActions, mapGetters} from "vuex";
import {ACTION_CLEAR_OFFSETS, ACTION_GET_OFFSETS, ACTION_GET_YEARS, ACTION_UPDATE_FILTER} from "@/store/temperature";

export default {
name: "OffsetHistoryView",
  components: {TTableOffsets, DepartmentSelector, YearSelector, MonthSelector, TFilterOption},
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
      },
      isProgressActive: false,
    }
  },
  methods: {
    ...mapActions([ACTION_GET_YEARS, ACTION_GET_OFFSETS, ACTION_UPDATE_FILTER, ACTION_CLEAR_OFFSETS]),

    async updateYear(indexesYear) {
      if (indexesYear.length == 2) {
        let year1 = this.accessYears[indexesYear[0]];
        let year2 = this.accessYears[indexesYear[1]];
        this.isProgressActive = true;
        await this[ACTION_GET_OFFSETS]({year1, year2});
        this.isProgressActive = false;
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
  },

  beforeRouteLeave(to, form, next) {
    this[ACTION_CLEAR_OFFSETS]();
    next();
  }
}
</script>

<style scoped>

</style>