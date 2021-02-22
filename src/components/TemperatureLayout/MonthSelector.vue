<template>
  <v-container class="month-selector">
    <div class="month-selector__title">
      <span >
      Выберите месяца для отображения
    </span>
    </div>

      <v-btn-toggle
          multiple
          v-model="values"
      >
        <v-row>
        <v-col
            v-for="month in months"
            :key="month"
            cols="4"
        >
          <v-btn
              block
              small
              outlined
              :disabled="isBtnDisabled(month)"
              color="blue darken-2"
          >
            {{month}}
          </v-btn>
        </v-col>
        </v-row>
      </v-btn-toggle>
  </v-container>
</template>

<script>
export default {
  name: "MonthSelector",
  data: () => {
    return {
      months: [
          'Янв',
          'Фев',
          'Мар',
          'Апр',
          'Май',
          'Июн',
          'Июл',
          'Авг',
          'Сен',
          'Окт',
          'Ноя',
          'Дек'
      ]
    }
  },
  props: [
      'activeMonth',
      'selected'
  ],
  methods: {
    isBtnDisabled(month) {
      let index = this.months.indexOf(month);
      return !this.activeMonth.includes(index);
    }
  },
  computed: {
      values: {
        set: function (value) {
          this.$emit('update', value);
        },
        get: function () {
          return this.selected;
        }
      }
  }

}
</script>

<style lang="sass" scoped>

.month-selector

  padding: 20px

  &__title
    padding-bottom: 12px

</style>