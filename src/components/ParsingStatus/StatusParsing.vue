<template>
  <v-list-item-action>
    <v-scroll-x-transition>
      <v-progress-circular
          v-if="result === 'InProgress'"
          color="orange"
          size=15
          width="3"
          indeterminate/>
      <v-btn icon v-else @click="$emit('delete')">
        <v-icon :color="result === 'Success'? 'green': 'red'">
          {{result === 'Success'? 'mdi-check': 'mdi-close'}}
        </v-icon>
      </v-btn>
    </v-scroll-x-transition>
  </v-list-item-action>
</template>

<script>

export default {
  name: "StatusParsing",
  props: ['result'],
}
</script>

<style scoped>

</style>