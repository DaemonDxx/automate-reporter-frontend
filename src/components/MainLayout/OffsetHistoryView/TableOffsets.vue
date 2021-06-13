<template>
      <v-row>
        <v-col
            sm="12"
            md="6"
        >
          <custom-select
              :items="months"
              :accessible-items="accessMonths"
              fieldname="month"
              v-on:changeValue="updateFilter"
          >
            Выберете месяца для отображения
          </custom-select>
        </v-col>
        <v-col
            sm="12"
            md="6"
        >
          <custom-select
              :items="departments"
              :accessible-items="accessDepartments"
              fieldname="department"
              v-on:changeValue="updateFilter"
          >
            Выберете филиалы для отображения
          </custom-select>
        </v-col>
    <v-divider/>
        <v-col cols="12">
          <v-data-table
              :headers="tableOption.headers"
              :items="dataTable"
              disable-filtering
              disable-pagination
              disable-sort
              hide-default-footer
              dense
              no-data-text="Выберите данные для отображения"
          />
        </v-col>
      </v-row>
</template>

<script>
import {MonthsList, monthsToIndexes} from "../../../months";
import {DepartmentsList} from "../../../departments";
import Converter from '../../../utils/converter/converter';
import {sum, average} from "../../../utils/converter/convertationFunctions";
import CustomSelect from "../../common/inputs/CustomSelect";

export default {
  name: "TableOffsets",
  components: {CustomSelect},
  data() {
    return {
      months: MonthsList,
      departments: DepartmentsList,
      filter: {
        month: [],
        department: []
      },
      tableOption: {
        headers: [
          {text: 'Филиал', align: 'center', value: 'department', sort: false},
          {text: 'ОС прошлый', align: 'center', value: 'receptionBefore', sort: false},
          {text: 'ОС текущий', align: 'center', value: 'receptionNow', sort: false},
          {text: 't прошлый', align: 'center', value: 'temperatureBefore', sort: false},
          {text: 't текущий', align: 'center', value: 'temperatureNow', sort: false},
          {text: 't фактор', align: 'center', value: 'offset', sort: false},
        ]
      },
      dataTable: []
    }
  },
  props: {
    offsets: {
      type: Array,
      defaults: [],
    }
  },
  methods: {
    updateFilter({field, value}) {
      if (field === 'month') {
        this.filter[field] = monthsToIndexes(value);
      } else {
        this.filter[field] = value;
      }

    },

    updateDataTable() {
      this.dataTable = this.converter.getConvertedData(this.filter);
    },
  },
  computed: {
    accessMonths() {
      const indexesOfMonths = Array.from(new Set(this.offsets.map(el => el.month)));
      return indexesOfMonths.map(el => MonthsList[el]);
    },

    accessDepartments() {
      return this.offsets.length > 0 ? this.departments:[];
    }
  },

  watch: {
    offsets: function (value) {
      this.converter.setValues(value);
      this.updateDataTable();
    },

    filter: {
      deep: true,
      handler: function () {
        this.updateDataTable();
      }
    }
  },

  beforeMount() {
    this.converter = new Converter({
      rules: {
        receptionBefore: {
          convertation: sum
        },
        receptionNow: {
          convertation: sum
        },
        temperatureNow: {
          convertation: average
        },
        temperatureBefore: {
          convertation: average
        },
        offset: {
          convertation: sum
        }
      },
      mainField: 'department'
    });
    this.converter.setValues(this.offsets);
    this.updateDataTable();
  },


}
</script>

<style scoped>

</style>