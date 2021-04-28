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
          <v-divider></v-divider>
        </v-sheet>

      </v-col>
      <v-col md="8">
        <TableWithFilter>
          <template v-slot:filter="{ update }">
            <CustomSelect
                :items="months"
                :accessible-items="['Январь']"
                v-on:changeValue="update($event, 'months')"
            >

              Выберете месяца для отображения
            </CustomSelect>
            <CustomSelect
                :items="departments"
                :accessible-items="departments"
              v-on:update="update('departments')">
              Выберете филиалы для отображения
            </CustomSelect>
          </template>

          <template v-slot:table="{filter}">
            {{filter}}
          </template>
        </TableWithFilter>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ACTION_CLEAR_OFFSETS, ACTION_GET_OFFSETS, ACTION_GET_YEARS, ACTION_UPDATE_FILTER} from "@/store/temperature";
import {ACTION_GET_VALUE, ACTION_SOLVE_OFFSETS_BY_YEAR} from "@/store/value";
import {Departments} from "@/departments";
import TableWithFilter from "../../components/common/tables/TableWithFilter";
import CustomSelect from "../../components/common/inputs/CustomSelect";

export default {
name: "OffsetHistoryView",
  components: {CustomSelect, TableWithFilter},
  data: () => {
    return {
      filter: {
        months: [],
        departments: []
      },
      isProgressActive: false,
      availableYear: [],
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ],
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
      ],
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

<style lang="sass" scoped>

</style>