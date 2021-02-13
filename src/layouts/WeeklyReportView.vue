<template>
    <v-card>
     <v-row
      class="pa-3"
     >
       <v-col
           v-for="department in listOfDepartment"
           :key="department"
           cols="4">
         <my-file-chips
            :department="department"
            :files="filesByDepartment(department)"
            v-on:updateStatus="updateStatusOfFile"
         >

         </my-file-chips>
       </v-col>
     </v-row>
     <my-file-upload
      v-on:saveFile="sendFile"
     >

     </my-file-upload>
    </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ACTION_SET_SELECTED_REPORT, ACTION_UPDATE_FIELD_IN_REPORT} from "@/store";
import {ACTION_SEND_FILE, ACTION_GET_FILES_BY_REPORT, ACTION_SET_ACTIVE_STATUS} from "@/store/weekly";
import MyFileUpload from "@/components/MyFileUpload";
import MyFileChips from "@/components/MyFileChips";

export default {
  name: "WeeklyReportView",
  components: {MyFileChips, MyFileUpload},
  data: () => {
    return {
      currentIdReport: '',
      listOfDepartment: [
          'Алтайэнерго',
          'Бурятэнерго',
          'ГАЭС',
          'Красноярскэнерго',
          'Кузбассэнерго-РЭС',
          'Омскэнерго',
          'Читаэнерго',
          'Хакасэнерго',
          'АО "Тываэнерго"'
      ]
    }
  },
  methods: {
    ...mapActions([
        ACTION_SEND_FILE,
        ACTION_SET_SELECTED_REPORT,
        ACTION_GET_FILES_BY_REPORT,
        ACTION_SET_ACTIVE_STATUS
    ]),

    async updateStatusOfFile(fileID) {
      await this[ACTION_SET_ACTIVE_STATUS](fileID);
    },

    async updateReport(event) {
      await this[ACTION_UPDATE_FIELD_IN_REPORT](event);
    },

    async sendFile({file}) {
      await this[ACTION_SEND_FILE](file);
    }

  },
  computed: {
    ...mapGetters(["selectedReport", "files", "filesByDepartment"])
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