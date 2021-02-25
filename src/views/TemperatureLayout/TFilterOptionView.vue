<template>
  <v-container>
    <v-sheet
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
      arr: [0,1,2]
    }
  }
}
</script>

<style scoped>

</style>