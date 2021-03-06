<template>
  <v-container
      class="fill-height"
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col
          xl="3"
          md="5"
          xs="12"
          sm="8"
      >
        <router-view>

        </router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: "AuthLayout"
}
</script>

<style lang="sass" scoped>

</style>