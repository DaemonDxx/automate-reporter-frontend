<template>
  <v-container>
    <v-card class="elevation-0">
      <v-form @submit.prevent="getOffset">
        <v-card-title>
          Индивидуальный расчет
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col
                cols="12"
                md="3"
            >
              <v-select
                  v-model="query.department"
                  label="Филиал"
                  outlined
                  :items="departments"
              >

              </v-select>
            </v-col>

            <v-col
                cols="12"
                md="3"
            >
              <v-text-field
                  v-model="query.reception"
                  outlined
                  type="number"
                  label="ОС прошлого периода"
                  placeholder="163233,342"
              />
            </v-col>
            <v-col
                cols="12"
                md="3"
            >
              <v-text-field
                  v-model="query.temperatureBefore"
                  outlined
                  type="number"
                  label="t прошлого периода"
                  placeholder="9,0"
              />
            </v-col>

            <v-col
                cols="12"
                md="3"
            >
              <v-text-field
                  v-model="query.temperatureNow"
                  outlined
                  type="number"
                  label="t текущего периода"
                  placeholder="13,5"
              />
            </v-col>
          </v-row>
          <span>Отпуск в сеть изменится на <b>{{offset}} ({{percent}}%)</b></span>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
              class="mr-3 mb-3"
              color="primary"
              @click.prevent="getOffset"
              type="submit">
            Расчитать
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>


</template>

<script>
import {DepartmentsList} from "@/departments";
import {mapActions} from "vuex";
import {ACTION_SOLVE_PERSONAL_OFFSET} from "@/store/value";

export default {
  name: "SolverView",
  data: () => {
    return {
      departments: DepartmentsList,
      query: {
        reception: 0,
        temperatureBefore: 0,
        temperatureNow: 0,
        department: ''
      },
      offset: 0,
      percent: 0,
    }
  },
  methods: {
    ...mapActions([ACTION_SOLVE_PERSONAL_OFFSET]),

    async getOffset() {
      const offset = await this[ACTION_SOLVE_PERSONAL_OFFSET](this.query);
      const intl = Intl.NumberFormat('ru-RU')
      this.percent = ((offset/this.query.reception)*100).toFixed(2);
      this.offset = intl.format(offset.toFixed(3));
    }
  },

  computed: {
  }
}
</script>

<style scoped>

</style>