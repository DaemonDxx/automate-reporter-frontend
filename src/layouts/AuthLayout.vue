<template>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
          xl="3"
          md="4"
          xs="12"
          sm="8"
      >
        <v-slide-x-reverse-transition mode="out-in">
          <router-view/>
        </v-slide-x-reverse-transition>
      </v-col>
    </v-row>
</template>

<script>
export default {
name: "AuthLayout"
}
</script>

<style lang="sass" scoped>

</style>