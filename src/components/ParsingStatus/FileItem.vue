<template>
  <v-list-item class="file-item">
      <v-list-item-icon>
        <v-icon color="green">
          mdi-file-excel-outline
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content class="file-item__content">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-on="on" v-bind="attrs">{{file.filename}}</span>
          </template>
        <span v-if="file.result === 'InProgress'">
          Идет паринг файла...
        </span>
          <span v-else-if="file.result === 'Success'">
            Файл успешно распарсен
          </span>
          <span v-else>
            Во время парсинга возникли следующие ошибки: {{file.parseErrors.join(',')}}
          </span>
        </v-tooltip>
      </v-list-item-content>
      <StatusParsing
          v-on:delete="deleteFile(file._id)"
          :result="file.result" />
  </v-list-item>
</template>

<script>
import {mapActions} from "vuex";
import {ACTION_DELETE_FILE} from "@/store/storage";
import StatusParsing from "@/components/ParsingStatus/StatusParsing";

export default {
  name: "FileItem",
  components: {StatusParsing},
  props: ['file'],
  methods: {
    ...mapActions({
      deleteFile: ACTION_DELETE_FILE
    }),
  }
}
</script>

<style lang="sass" scoped>

.file-item
  &__content
    font-size: 0.75rem

  &__action

  &__icon
</style>