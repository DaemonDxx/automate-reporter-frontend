<template>
  <div>
    <v-app-bar
        color="primary"
        dense
        app
    >
      <v-app-bar-nav-icon>
        Б
      </v-app-bar-nav-icon>
      <v-spacer>

      </v-spacer>
      <v-btn
          color="white"
          text
          @click="logout"
      >
        Выход
      </v-btn>

    </v-app-bar>
    <v-main>
      <v-container>
          <navigation-bar
              :items="links"
          />
          <router-view/>
      </v-container>
    </v-main>
    <v-footer>

    </v-footer>
    <v-fade-transition>
      <ParsingFileDialog
          :files="activeParsingFiles"
          :is-show-dialog="isShowDialog"/>
    </v-fade-transition>
  </div>

</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {ACTION_LOGOUT} from "@/store/auth";
import ParsingFileDialog from "@/components/ParsingStatus/ParsingFileDialog";
import NavigationBar from "../components/MainLayout/NavigationBar";

export default {
  name: "MainLayout",
  data: () => {
    return {
      links: [
        {
          title: 'База данных',
          icon: 'mdi-database',
          path: '/database',
          accessList: ['ALL']
        },
        {
          title: 'Расчет',
          icon: 'mdi-calculator',
          path: '/solver',
          accessList: ['ALL']
        },
        {
          title: 'Обновление БД',
          icon: 'mdi-pencil-plus',
          path: '/db_changer',
          accessList: ['CREATOR', 'ADMIN']
        }
      ]
    }
  },
  components: {
    NavigationBar,
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
  },

}
</script>

<style lang="sass" scoped>
.app
  background: black
</style>