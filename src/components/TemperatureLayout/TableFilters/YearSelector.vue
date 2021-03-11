<template>
  <v-container>
    <div class="mb-2 text-center">
      Выберите 2 года из списка
    </div>
    <v-btn-toggle
      v-model="selectedYears"
      multiple
      @change="update"
    >
      <v-row
      >
        <v-col
            v-for="year of yearItems"
            xs="6"
            sm="3"
            md="4"
            :key="year"
        >
          <v-btn
              :disabled="isBtnDisabled(year)"
              small
              block
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
    update() {
      if (this.selectedYears.length === 2) {
        const years = this.selectedYears.map(index => this.yearItems[index]);
        this.$emit('update', years)
      }
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

  },
}
</script>

<style scoped>

</style>