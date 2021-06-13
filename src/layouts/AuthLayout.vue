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
        <router-view>

        </router-view>
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