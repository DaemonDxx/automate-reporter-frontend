<template>
  <div>
    <v-card v-if="report">
      <v-card-title
      >
          <my-editable-span
              :text="description"
              field="description"
              v-on:update="updateReport"
          >
          </my-editable-span>
          <v-spacer></v-spacer>

        <v-dialog
          width="300"
          v-model="modalDeleteReport"
        >
          <template v-slot:activator="{ on, attr }">
            <v-btn
                icon
                v-on="on"
                v-bind="attr"
            >
              <v-icon
                  color="error"
              >
                mdi-delete-outline
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              Удалить отчет?
            </v-card-title>
            <v-card-actions>
              <v-btn
                color="error"
                outlined
                @click="deleteReport"
              >
                Удалить
              </v-btn>
              <v-spacer>
              </v-spacer>
              <v-btn
                @click="modalDeleteReport =! modalDeleteReport"
              >
                Нет
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>
      </v-card-title>
      <v-card-subtitle>
        {{`${typeOfReport} отчет от ${report.day}.${report.month+1}.${report.year}`}}
      </v-card-subtitle>
      <v-card-text>

      </v-card-text>
      <v-card-actions>
        <v-btn block outlined color="green">
          Сформировать отчет
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <ModalCreateReport
        v-on:new-report="emitEvent"
      >

      </ModalCreateReport>
    </v-card>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {
  ACTION_CREATE_REPORT, ACTION_DELETE_REPORT,
  ACTION_GET_REPORTS,
  ACTION_SET_SELECTED_REPORT,
  ACTION_UPDATE_FIELD_IN_REPORT
} from "@/store";
import MyEditableSpan from "@/components/MyEditableSpan";
import ModalCreateReport from "@/components/ModalCreateReport";

export default {
  name: "ReportOption",
  data: () => {
    return {
      modalDeleteReport: false,
      modalCreateReport: false,
      typesOfReport: {
        'WEEKLY': 'Еженедельный',
      }
    }
  },
  components: {ModalCreateReport, MyEditableSpan},
  props: [
      'report'
  ],
  computed: {

    description: function () {
      return this.report?.description ?? 'Нет описания';
    },

    typeOfReport: function () {
      return this.typesOfReport[this.report?.type] ?? 'Отчет не выбран';
    }

  },

  methods: {
    ...mapActions([
      ACTION_GET_REPORTS,
      ACTION_SET_SELECTED_REPORT,
      ACTION_CREATE_REPORT,
      ACTION_UPDATE_FIELD_IN_REPORT,
      ACTION_DELETE_REPORT
    ]),

    async deleteReport() {
      this.modalDeleteReport = false;
      await this[ACTION_DELETE_REPORT]();
      await this[ACTION_GET_REPORTS]();
      await this.$router.push('/report');
    },

    async updateReport(event) {
      await this[ACTION_UPDATE_FIELD_IN_REPORT](event);
    },

    async emitEvent(newReport) {
      await this[ACTION_GET_REPORTS]();
      this.$emit('new-report', newReport);
    }
  }
}
</script>

<style scoped>

</style>