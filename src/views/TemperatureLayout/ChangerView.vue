<template>
  <v-container>
    <v-card>
      <v-card-title>
        Обновление данных в базе
      </v-card-title>
    <v-card-text>
      <span>
        На данный момент обновление данных возможно только через загрузку файла, соответсвующего
      </span>
      <a download href="/Template/Анализ.xlsx">шаблону</a>
      <my-file-upload
          v-on:saveFile="sendFileInServer"
      >

      </my-file-upload>
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
import MyFileUpload from "@/components/MyFileUpload";
import {mapActions} from "vuex";
import {ACTION_PARSE_VALUE_FROM_FILE} from "@/store/temperature";
import {ACTION_SEND_FILE, ACTION_UPDATE_FILE_INFO} from "@/store/storage";
export default {
  name: "ChangerView",
  components: {MyFileUpload},
  data: () => {
    return {
      departments: [
        '"Алтайэнерго"',
        '"Бурятэнерго"',
        '"ГАЭС"',
        '"Красноярскэнерго"',
        '"Кузбассэнерго-РЭС"',
        '"Омскэнерго"',
        '"Хакасэнерго"',
        '"Читаэнерго"',
        'АО "Тываэнерго"',
      ],
      isParsingFile: false
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
          type: 'TemperatureCoefficients'
        })
      this.isParsingFile = false;
    },
  }
}
</script>

<style scoped>

</style>