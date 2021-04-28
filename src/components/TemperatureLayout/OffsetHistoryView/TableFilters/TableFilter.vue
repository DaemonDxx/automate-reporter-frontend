<template>
  <v-container>

  </v-container>
</template>

<script>


export default {
  name: "TableFilter",
  components: {},
  props: [
      'accessMonthIndexes'
  ],
  data: () => {
    return {
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
      filter: {
        months: [],
        departments: [],
      }
    }
  },
  methods: {
    updateField({field, value}) {
      if (field === 'months')
        this.filter[field] = value.map(month => this.months.indexOf(month));
      else
        this.filter[field] = value;
      this.updateFilter();
    },
    updateFilter() {
      this.$emit('updateFilter', this.filter);
    }
  },
  computed: {
    accessebleDepartments() {
      return this.accessMonthIndexes.length !== 0? this.departments:[];
    },
    accessebleMonths() {
      return this.accessMonthIndexes.map(index => this.months[index]);
    },
  },

}
</script>

<style scoped>

</style>