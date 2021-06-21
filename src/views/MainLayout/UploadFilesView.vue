<template>
  <v-container>
    <v-card class="elevation-0 rounded-lg">
      <v-card-title>
        Обновление данных в базе
      </v-card-title>
    <v-card-text>

      <span>
        Обновление данных возможно только через загрузку файла, соответсвующего шаблону:
      </span>

      <ul>
        <li>
          <a download href="/Template/Анализ.xlsx">Температура и отпуск в сеть</a>
        </li>
        <li>
          <a download href="/Template/Коэф.xlsx">Температурные коэффициента</a>
        </li>
      </ul>

      <v-select
          class="mt-6"
          v-model="selectedType"
          :items=typesFile
          item-value="value"
          item-text="title"

          outlined
          label="Выберите тип файла"
      />

      <file-uploader
          height="30"
          v-on:saveFile="sendFileInServer"
      />
      <v-progress-linear
        color="orange darken-3"
        indeterminate
        rounded
        height="6"
        :active="isParsingFile"
      >

      </v-progress-linear>
    </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import {ACTION_SEND_FILE} from "@/store/storageStore";
import {DepartmentsList} from "@/departments";
import FileUploader from "../../components/MainLayout/FileUploader";

export default {
  name: "UploadFilesView",
  components: {FileUploader},
  data: () => {
    return {
      departments: DepartmentsList,
      typesFile: [
          {
            title: 'Температура и отпуск в сеть',
            value: 'TemperatureTable'
          },
          {
            title: 'Температурные коэффициенты',
            value: 'TemperatureCoefficients',
          }
      ],
      isParsingFile: false,
      selectedType: 'TemperatureTable'
    }
  },
  methods: {
    ...mapActions([ACTION_SEND_FILE]),

    async sendFileInServer({file}) {
      this.isParsingFile = true;
      await this[ACTION_SEND_FILE]({
        file,
        type: this.selectedType
      });
      this.isParsingFile = false;
    },
  }
}
</script>

<style scoped>

</style>