<template>
  <v-row>
    <v-col cols="12">
      <v-item-group
        v-model="selectedYears"
        multiple
        @change="handlerChange"
      >
        <v-row>
          <v-col
            v-for="year in yearItems"
            :key="year"
          >
            <v-item v-slot="{ active, toggle }"
                    active-class="white--text"
            >
              <v-btn
                  :color="active? 'primary' : ''"
                  block
                  :disabled="isBtnDisabled(year)"
                  @click="toggle"
                  height="32"
              >
                <div class="text-center pa-4">
                  {{year}}
                </div>
              </v-btn>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-col>
  </v-row>
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
    handlerChange() {
      if (this.selectedYears.length === 2) {
        const years = this.selectedYears.map(index => this.yearItems[index]);
        this.$emit('update', years.sort())
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