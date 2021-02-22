<template>
  <v-app >
    <v-app-bar
        color="blue darken-2"
        app>
        <v-app-bar-nav-icon>
          Б
        </v-app-bar-nav-icon>
        <v-btn class="ml-4 mr-4"
               color="white"
               outlined
               @click="$router.push('/report')"
        >
          Отчеты
        </v-btn>
      <v-btn class="ml-4 mr-4"
             color="white"
             outlined
             @click="$router.push('/temperature')"
      >
        <router-link to="/">

        </router-link>
          Температурный фактор
        </v-btn>
        <v-spacer>

        </v-spacer>
        <v-btn>
          Выход
        </v-btn>

    </v-app-bar>
    <v-main class="grey">
        <router-view>

        </router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "MainLayout",

}
</script>

<style scoped>

</style>