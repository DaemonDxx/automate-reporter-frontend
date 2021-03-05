<template>
  <v-container>
    <v-sheet
        class="elevation-5"
      rounded
    >
      <slot name="year-selector">

      </slot>
      <v-divider></v-divider>
        <slot name="month-selector">

        </slot>
      <v-divider></v-divider>
      <slot name="department-selector">

      </slot>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "TFilterOptionView",
  data: () => {
    return {

    }
  }
}
</script>

<style scoped>

</style>