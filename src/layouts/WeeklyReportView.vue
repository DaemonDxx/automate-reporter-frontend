<template>
    <v-card>
      Пример
    </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ACTION_UPDATE_FIELD_IN_REPORT} from "@/store";

export default {
  name: "WeeklyReportView",
  methods: {
    ...mapActions([ACTION_UPDATE_FIELD_IN_REPORT]),

    async updateReport(event) {
      await this[ACTION_UPDATE_FIELD_IN_REPORT](event);
    }
  },
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

.no-border {
  border: none;
}

</style>