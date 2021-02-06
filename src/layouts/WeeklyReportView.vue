<template>
    <v-card>
      <v-card-title>
      </v-card-title>

    </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "WeeklyReportView",
  computed: {
    ...mapGetters(["selectedReport"])
  },
  watch: {
    selectedReport: function (old, now) {
      if (old._id !== now._id) {
        console.log();
      }
    }
  },
}
</script>

<style scoped>

</style>