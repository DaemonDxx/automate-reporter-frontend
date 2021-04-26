<template>
  <v-container>
    <v-row>
      <v-col
          xs="12"
          sm="12"
          md="4"
          lg="3"
      >
        <v-sheet
          rounded
          elevation="5"
        >
          <year-selector
              :year-items="availableYear"
              @update="getOffsetsByYear"
          >
          </year-selector>
          <v-divider></v-divider>
          <TableFilter
              :access-month-indexes="availableMonth"
              @updateFilter="updateFilter"
          >
          </TableFilter>
        </v-sheet>

      </v-col>
      <v-col
          xs="12"
          sm="12"
          md="8"
          lg="9"
      >
        <v-row>
          <Statistics>
          </Statistics>
        </v-row>
        <v-row>
          <TableOffsets
              :data="sumOffsets(filter)"
          >
          </TableOffsets>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableOffsets from "@/components/TemperatureLayout/OffsetHistoryView/TableOffsets";
import YearSelector from "@/components/TemperatureLayout/OffsetHistoryView/TableFilters/YearSelector";
import {mapActions, mapGetters} from "vuex";
import {ACTION_CLEAR_OFFSETS, ACTION_GET_OFFSETS, ACTION_GET_YEARS, ACTION_UPDATE_FILTER} from "@/store/temperature";
import TableFilter from "@/components/TemperatureLayout/OffsetHistoryView/TableFilters/TableFilter";
import Statistics from "@/components/TemperatureLayout/OffsetHistoryView/Statistics";
import {ACTION_GET_VALUE, ACTION_SOLVE_OFFSETS_BY_YEAR} from "@/store/value";
import {Departments} from "@/departments";

export default {
name: "OffsetHistoryView",
  components: {Statistics, TableFilter, TableOffsets, YearSelector},
  data: () => {
    return {
      filter: {
        months: [],
        departments: []
      },
      isProgressActive: false,
      availableYear: [],
    }
  },
  methods: {
    ...mapActions([
        ACTION_GET_YEARS,
        ACTION_GET_OFFSETS,
        ACTION_SOLVE_OFFSETS_BY_YEAR,
        ACTION_UPDATE_FILTER,
        ACTION_CLEAR_OFFSETS,
        ACTION_GET_VALUE
    ]),

    async getAvailableYear() {
      const values = await this[ACTION_GET_VALUE]({
        type: 'Temperature',
        department: Departments.AE,
        month: 0,
      });
      console.table(values);
      this.availableYear = Array.from(new Set(values.map(item => item.year)));
    },

    async getOffsetsByYear([year1, year2]) {
        this.isProgressActive = true;
        await this[ACTION_SOLVE_OFFSETS_BY_YEAR]({
            yearBefore: year1,
            yearNow: year2
        });
        this.isProgressActive = false;
    },

    updateFilter(filter) {
      this.filter = filter;
    }

  },

  computed: {
    ...mapGetters(['accessMonth', 'sumOffsets', 'availableMonth']),

  },

  async beforeMount() {
   await this.getAvailableYear();
  },

  beforeRouteLeave(to, form, next) {
    this[ACTION_CLEAR_OFFSETS]();
    next();
  }
}
</script>

<style scoped>

</style>