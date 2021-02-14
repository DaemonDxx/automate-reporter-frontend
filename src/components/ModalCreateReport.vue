<template>
  <v-dialog
      v-model="isShow"
      width="400"
  >
    <template v-slot:activator="{on, attr}">
      <v-btn
          outlined
          color="purple"
          block
          v-on="on"
          v-bind="attr"
      >
        Создать новый отчет
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Новый отчет
      </v-card-title>
      <v-card-text>
        <v-form>
            <v-select
              label="Тип отчета"
              :items="typesOfReport"
              item-text="description"
              item-value="key"
              v-model="newReport.type"
            >
            </v-select>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="newReport.year"
                label="Год"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="monthForm"
                :items="arrayMonth"
                label="Месяц"
              >
              </v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="newReport.day"
                label="День"
              >

              </v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            v-model="newReport.description"
            label="Описание"
            placeholder="Пример: Еженедельный отчет за февраль с 1 по 7"
          >

          </v-text-field>


        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
           outlined
           color="purple"
           @click="createReport"
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";
import {ACTION_CREATE_REPORT, ACTION_GET_REPORTS, ACTION_SET_SELECTED_REPORT} from "@/store";

export default {
  name: "ModalCreateReport",
  data: () => {
    return {
      newReport: {
        description: '',
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        type: '',
      },
      isShow: false,
      typesOfReport: [
        {
          key: 'WEEKLY',
          description: 'Еженедельный'
        }
      ],
      arrayMonth: [
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
          'Декабрь',
      ]
    }
  },
  methods: {

    ...mapActions([
        ACTION_CREATE_REPORT,
        ACTION_GET_REPORTS,
        ACTION_SET_SELECTED_REPORT
    ]),

    async createReport() {
      const report =  await this[ACTION_CREATE_REPORT](this.newReport);
      if (report._id) {
        this.resetForm();
        await this.$emit('new-report', report)
        this.isShow = false;
      }
    },

    resetForm() {
      this.newReport.description = '';
      this.newReport.year = new Date().getFullYear();
      this.newReport.month = new Date().getMonth();
      this.newReport.day = new Date().getDate();
      this.newReport.type =  '';
    }
  },

  computed: {
    monthForm: {
      set: function (value) {
        this.newReport.month = this.arrayMonth.indexOf(value);
      },

      get: function () {
        return this.arrayMonth[this.newReport.month];
      }
    }
  }
}
</script>

<style scoped>

</style>