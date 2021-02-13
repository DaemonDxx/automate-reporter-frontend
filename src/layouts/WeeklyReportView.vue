<template>
    <v-card>
      <my-file-chips
        department="Алтайэнерго"
        :files="files"
      >
      </my-file-chips>
     <my-file-upload
      v-on:saveFile="sendFile"
     >

     </my-file-upload>
    </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ACTION_SET_SELECTED_REPORT, ACTION_UPDATE_FIELD_IN_REPORT} from "@/store";
import {ACTION_SEND_FILE, ACTION_GET_FILES_BY_REPORT} from "@/store/weekly";
import MyFileUpload from "@/components/MyFileUpload";
import MyFileChips from "@/components/MyFileChips";

export default {
  name: "WeeklyReportView",
  components: {MyFileChips, MyFileUpload},
  data: () => {
    return {
      currentIdReport: '',
      fileUpload: undefined,
      files: [
        {
          filename: 'АЭ2221.xlsx',
          department: 'Филиал',
          version: 2,
          errors: []
        },
        {
          filename: 'АЭ33123.xlsx',
          department: 'Филиал',
          version: 1,
          errors: ['d']
        }
      ]
    }
  },
  methods: {
    ...mapActions([ACTION_SEND_FILE, ACTION_SET_SELECTED_REPORT, ACTION_GET_FILES_BY_REPORT]),

    async updateReport(event) {
      await this[ACTION_UPDATE_FIELD_IN_REPORT](event);
    },

    async sendFile({file}) {
      await this[ACTION_SEND_FILE](file);
    }

  },
  computed: {
    ...mapGetters(["selectedReport"])
  },
  watch: {
    $route(to, from) {
      if (to.params.id !== from.params.id) {
        this[ACTION_SET_SELECTED_REPORT](to.params.id);
        this[ACTION_GET_FILES_BY_REPORT](to.params.id);
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