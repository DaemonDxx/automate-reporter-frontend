<template>
  <div class="chip">
    <div class="chip__icon">
      <div class="chip__bg">

      </div>
      <span class="chip__icon-text">
        АЭ
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyFileChips",
  data: () => {
    return {
      selectedFile: [
        {

        }
      ]
    }
  },
  props: [
      'department',
      'files'
  ],
  computed: {
    isEmptyArray() {
      return this.files?.length === 0;
    },
    colorAvatar() {
      if (this.files?.length === 0)
          return 'grey';
      if (this.selectedFile?.errors?.length === 0) {
        return 'green';
      } else {
        return 'red'
      }
    }
  }
}
</script>

<style lang="sass" scoped>

.chip
  display: flex
  min-height: 44px
  border: 1px solid blue

  &__icon
    display: flex
    justify-content: center
    align-items: center
    min-width: 44px
    margin: 0
    padding-right: 6px
    border-top-right-radius: 50%
    border-bottom-right-radius: 50%
    text-align: center

  &__bg
    background-color: green
    tra

  &__icon-text


  &__content

.have-error

.have-not-error

.selected
  display: flex
  flex-direction: column

.file


</style>