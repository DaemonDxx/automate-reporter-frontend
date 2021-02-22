<template>
  <v-container>
    <div class="year-selector__title">
      Выберите 2 года из списка
    </div>
    <v-btn-toggle
      v-model="selectedYears"
      multiple
      @change="update"
    >
      <v-row>
        <v-col
            v-for="year of yearItems"
            cols="4"
            :key="year"
        >
          <v-btn
              :disabled="isBtnDisabled(year)"
              small
              outlined
              color="blue"
          >
            {{year}}
          </v-btn>
        </v-col>
      </v-row>
    </v-btn-toggle>

  </v-container>
</template>

<script>
export default {
  name: "YearSelector",
  props: [
      'yearItems'
  ],
  data: () => {
    return {
      selectedYears: [],
    }
  },
  methods: {
    update(value) {
      console.log(value);
      this.$emit('update', value);
    },
    isBtnDisabled(year) {
      if (this.selectedYears.length === 2 && !this.selectedYears.includes(this.yearItems.indexOf(year))) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {

  }
}
</script>

<style scoped>

</style>