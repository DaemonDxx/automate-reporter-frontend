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
               @click="$router.push('/offsets')"
        >
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
    <v-fade-transition>
      <ParsingFileDialog
          :files="activeParsingFiles"
          :is-show-dialog="isShowDialog"/>
    </v-fade-transition>
  </v-app>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {ACTION_LOGOUT} from "@/store/auth";
import ParsingFileDialog from "@/components/ParsingStatus/ParsingFileDialog";

export default {
  name: "MainLayout",
  components: {
    ParsingFileDialog,
  },
  methods: {
    ...mapActions([ACTION_LOGOUT]),

    logout() {
      this[ACTION_LOGOUT]();
      this.$router.push('/auth/login');
    }
  },
  computed: {
    ...mapGetters(['isAuth', 'isShowDialog', 'activeParsingFiles']),
  }

}
</script>

<style scoped>

</style>