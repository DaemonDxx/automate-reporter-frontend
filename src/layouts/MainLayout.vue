<template>
  <v-app >
      <v-app-bar
          v-if="isAuth"
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
        <v-btn
            @click="logout"
        >
          Выход
        </v-btn>

      </v-app-bar>
    <notifications
    />
    <v-main class="grey">
        <router-view>

        </router-view>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {ACTION_LOGOUT} from "@/store/auth";

export default {
  name: "MainLayout",
  methods: {
    ...mapActions([ACTION_LOGOUT]),

    logout() {
      this[ACTION_LOGOUT]();
      this.$router.push('/auth/login');
    }
  },
  computed: {
    ...mapGetters(['isAuth']),
  }

}
</script>

<style scoped>

</style>