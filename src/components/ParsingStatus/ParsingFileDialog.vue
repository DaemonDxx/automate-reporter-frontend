<template>
  <v-slide-y-transition>
    <v-card v-if="isShowDialog" ref="test" class="file-info elevation-5">
      <v-card-title class="primary file-info__title">
        Статус загруженных файлов {{`(${files.length})`}}
        <v-spacer/>
        <v-btn icon @click="isMinimize = !isMinimize">
          <v-icon color="white">
            {{isMinimize?'mdi-chevron-up ':'mdi-minus'}}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-list
          v-if="!isMinimize"
          style="max-height: 240px"
          class="overflow-y-auto"
      >
        <v-slide-x-transition
            group
        >
          <FileItem v-for="file in files" :key="file._id" :file="file"/>
        </v-slide-x-transition>
      </v-list>
    </v-card>
  </v-slide-y-transition>
</template>

<script>
import FileItem from "@/components/ParsingStatus/FileItem";
export default {
  name: "ParsingFileDialog",
  data: () => {
    return {
      isMinimize: false,
    }
  },
  components: {FileItem},
  props: ['files', 'isShowDialog'],
  computed: {

  },
  mounted() {

  },

  beforeUpdate() {

  }
}

</script>

<style lang="sass" scoped>

.file-info
  max-height: 300px
  width: 320px
  position: fixed
  bottom: 14px
  right: 14px
  &__title
    font-size: 14px
    color: white
    padding-top: 8px
    padding-bottom: 8px

  &__content
    overflow: auto

</style>