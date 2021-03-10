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
import {ACTION_SEND_FILE} from "@/store/weekly";
import {ACTION_PARSE_VALUE_FROM_FILE} from "@/store/temperature";
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
    ...mapActions([ACTION_SEND_FILE, ACTION_PARSE_VALUE_FROM_FILE]),

    async sendFileInServer({file}) {
      this.isParsingFile = true;
      const {err, response} = await this[ACTION_SEND_FILE](file);
      if (err) {
        this.$notify({
          title: 'Ошибка загрузки файла',
          text: err,
          type: 'error'
        });
      } else {
        this.$notify({
          title: 'Загрузка файла',
          text: `Файл успешно сохранен под именем ${response.filename}`,
          type: 'success'
        });
        const result = await this[ACTION_PARSE_VALUE_FROM_FILE](response.filename);
        if (result.err) {
          this.$notify({
            title: 'Ошибка парсинга файла',
            text: `${result.err}`,
            type: 'error'
          });
        } else {
          this.$notify({
            title: 'Файл успешно распарсен',
            text: `Сохранено значений: ${result.response.saved} \n Обновлено значений: ${result.response.updated} \n`,
            type: 'success'
          })
        }
      }
      this.isParsingFile = false;
    },
  }
}
</script>

<style scoped>

</style>