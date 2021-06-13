<template>
  <div class="uploader"
       @drop="handleDrop"
       @dragover.prevent
       @dragenter.prevent
  >
    <v-form>
      <div class="uploader__drop-zone" :style="{'height': `${height}vh`}">
        <div class="uploader__input">
          <input @change="changeInput" id="inputFile" type="file">
          <span>Перетащите файл в данную область или </span>
          <label for="inputFile">выбирете файл</label>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {

  name: "FileUploader",
  props: {
    height: {
      default: 10
    }
  },
  data: () => {
    return {
    }
  },
  methods: {
    handleDrop(event) {
      event.preventDefault();
      this.$emit('saveFile', {
        file: event.dataTransfer.files[0]
      })
    },

    changeInput(event) {
      const file = event.srcElement.files[0];
      this.$emit('saveFile', {
        file
      });
      event.srcElement.value = '';
    },
  }
}
</script>

<style lang="sass" scoped>

.uploader
  padding: 10px 10px 10px 10px
  &__drop-zone
    display: flex
    justify-content: center
    align-items: center
    padding: 10px 10px 10px 10px
    border: 2px dotted grey


  &__input label
    color: grey
    text-decoration: underline

    &:hover
      color: blue

#inputFile
  display: none
</style>