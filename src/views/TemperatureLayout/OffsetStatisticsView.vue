<template>
  <v-container>
    <HeaderStatistics
        class="mb-4 elevation-5"
        :offset="offset"
    >

    </HeaderStatistics>
    <v-sheet
      rounded
      class="elevation-5"
    >
      <v-data-table
        :headers="headers"
        :items="data"
        disable-pagination
        hide-default-footer
        no-data-text="Выберите год для сравнения"
      >

      </v-data-table>
    </v-sheet>
  </v-container>
</template>

<script>

import HeaderStatistics from "@/components/TemperatureLayout/OffsetStatisticsView/HeaderStatistics";
export default {
  name: "OffsetStatisticsView",
  components: {HeaderStatistics},
  props: [
      'data'
  ],
  data: () => {
    return {
      headers: [
        {text: 'Филиал', value: 'department', sortable: true, align: 'center'},
        {text: 'ОС прошлый, тыс кВтч', value: 'receptionBefore', sortable: true, align: 'center'},
        {text: 't прошлая, Ц', value: 'tempWinter', sortable: true, align: 'center'},
        {text: 'ОС сейчас, тыс кВтч', value: 'receptionNow', sortable: true, align: 'center'},
        {text: 't сейчас, Ц', value: 'tempSummer', sortable: true, align: 'center'},
        {text: 't фактор, тыс кВтч', value: 'offset', sortable: true, align: 'center'},
        {text: 'Доля, %', value: 'offsetShare', sortable: true, align: 'center'},
      ]
    }
  },
  computed: {
    offset: function () {
      const all = this.data.find(item => item.department === 'Итого');
      console.log(all);
      return all?.offset;
    }
  }
}
</script>

<style scoped>

</style>