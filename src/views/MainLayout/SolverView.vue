<template>
  <v-container>
    <v-card class="elevation-0 rounded-lg">
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
                  :error-messages="receptionErrors"
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
                  :error-messages="temperatureBeforeErrors"
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
                  :error-messages="temperatureNowErrors"
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
import {validationMixin} from "vuelidate";
import {maxValue, minValue, required} from "vuelidate/lib/validators";

export default {
  name: "SolverView",
  data: () => {
    return {
      departments: DepartmentsList,
      query: {
        reception: '',
        temperatureBefore: '',
        temperatureNow: '',
        department: '"Алтайэнерго"'
      },
      offset: 0,
      percent: 0,
    }
  },
  methods: {
    ...mapActions([ACTION_SOLVE_PERSONAL_OFFSET]),

    async getOffset() {
      this.$v.$touch();
      if (this.$v.$error) return;
      const offset = await this[ACTION_SOLVE_PERSONAL_OFFSET](this.query);
      const intl = Intl.NumberFormat('ru-RU')
      this.percent = ((offset/this.query.reception)*100).toFixed(2);
      this.offset = intl.format(offset.toFixed(3));
    }
  },

  computed: {
    receptionErrors: function () {
      const errors = [];
      if (this.$v.query.reception.$dirty && this.$v.query.reception.$error) {
        if (!this.$v.query.reception.required) errors.push('ОС не должен быть пустым');
        if (!this.$v.query.reception.minValue) errors.push('ОС должен быть болльше 0');
      }
      return errors;
    },
    temperatureBeforeErrors: function () {
      const errors = [];
      if (this.$v.query.temperatureBefore.$dirty && this.$v.query.temperatureBefore.$error) {
        if (!this.$v.query.temperatureBefore.required) errors.push('Это поле не должно быть пустым');
        if (!this.$v.query.temperatureBefore.minValue) errors.push('ОС должен быть больше -50');
        if (!this.$v.query.temperatureBefore.maxValue) errors.push('ОС должен быть меньше 50');
      }
      return errors;
    },
    temperatureNowErrors: function () {
      const errors = [];
      if (this.$v.query.temperatureNow.$dirty && this.$v.query.temperatureNow.$error) {
        if (!this.$v.query.temperatureNow.required) errors.push('Это поле не должно быть пустым');
        if (!this.$v.query.temperatureNow.minValue) errors.push('ОС должен быть больше -50');
        if (!this.$v.query.temperatureNow.maxValue) errors.push('ОС должен быть меньше 50');
      }
      return errors;
    },
  },

  validations: {
    query: {
      reception: {
        required,
        minValue: minValue(1),
      },
      temperatureBefore: {
        required,
        minValue: minValue(-50),
        maxValue: maxValue(50),
      },
      temperatureNow: {
        required,
        minValue: minValue(-50),
        maxValue: maxValue(50),
      }
    }
  },

  mixins: [
      validationMixin
  ]
}
</script>

<style scoped>

</style>