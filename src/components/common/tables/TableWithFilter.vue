<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <slot v-bind:update="attachField" name="filter">

        </slot>
      </v-col>
      <v-col cols="12">
        <slot v-bind:filter="filter" name="table">

        </slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TableWithFilter",
  data: () => {
    return {
      filter: {
        months: []
      },
    }
  },
  methods: {
    attachField(value, fieldName) {
      console.log(value, fieldName);
      this.filter[fieldName] = value;
    },
  },
}
</script>

<style scoped>

</style>