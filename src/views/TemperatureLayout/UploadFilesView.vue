<template>
  <v-container>
    <v-card>
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
import FileUploader from "@/components/FileUploader";
import {mapActions} from "vuex";
import {ACTION_PARSE_VALUE_FROM_FILE} from "@/store/temperature";
import {ACTION_SEND_FILE, ACTION_UPDATE_FILE_INFO} from "@/store/storage";
import {DepartmentsList} from "@/departments";

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
    ...mapActions([ACTION_SEND_FILE, ACTION_PARSE_VALUE_FROM_FILE, ACTION_UPDATE_FILE_INFO]),

    async sendFileInServer({file}) {
      this.isParsingFile = true;
      const fileInfo = await this[ACTION_SEND_FILE](file);
      if (fileInfo)
        await this[ACTION_UPDATE_FILE_INFO]({
          _id: fileInfo._id,
          type: this.selectedType
        })
      this.isParsingFile = false;
    },
  }
}
</script>

<style scoped>

</style>