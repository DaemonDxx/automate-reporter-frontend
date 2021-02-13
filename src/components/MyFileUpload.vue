<template>
  <div class="uploader"
       @drop="handleDrop"
       @dragover.prevent
       @dragenter.prevent
  >
    <div class="uploader__drop-zone">
      <div class="uploader__input">
        <input id="inputFile" type="file">
        <span>Перетащите файл в данную область или </span>
        <label for="inputFile">выбирете файл</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: "MyFileUpload",
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
    }
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
    min-height: 10vh

  &__input label
    color: grey
    text-decoration: underline

    &:hover
      color: blue

#inputFile
  display: none
</style>