<template>
  <v-card>
    <v-card-title>
      Краткая характеристика сравнения  с  по температурному фактору
    </v-card-title>
    <v-card-text>
      За выбранный период <span>{{characteristic}}</span>
      <span :class="colorOffsetText">
        {{offset}}
      </span> тыс. кВт*ч, что составляет ... % от опуска в в сеть в ... году

      При этом средняя температура ....
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "HeaderStatistics",
  props: [
      'offset',
      'offsetShare',
      'tempMiddle'
  ],
  computed: {
    characteristic: function () {
      return parseFloat(this.offset) < 0?'снижение отпуска в сеть составило':'рост отпуска в сеть составил';
    },
    colorOffsetText: function () {
      return parseFloat(this.offset) < 0?'red':'success';
    }
  }
}
</script>

<style lang="sass" scoped>

</style>