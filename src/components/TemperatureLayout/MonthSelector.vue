<template>
  <v-container class="month-selector">
    <div class="month-selector__title">
      <span >
      Выберите месяца для отображения
    </span>
    </div>

      <v-btn-toggle
          multiple
          v-model="selected"
          @change="update"
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
      ],
      selected: []
    }
  },
  props: [
      'activeMonth'
  ],
  methods: {
    isBtnDisabled(month) {
      let index = this.months.indexOf(month);
      return !this.activeMonth.includes(index);
    },

    update(value) {
      this.$emit('update', {
        field: 'months',
        value
      })
    }
  },

  created() {
    for (let i = 0; i < this.activeMonth.length; i++) {
      this.selected.push(i);
    }
  },

  watch: {
    activeMonth: function (value) {
      for (let i = 0; i < value.length; i++) {
        this.selected.push(i);
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