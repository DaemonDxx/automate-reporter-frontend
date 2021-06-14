//TODO сделать нормальную ссылку на лого
<template>
  <div>
    <v-app-bar
        color="primary"
        dense
        app
    >
      <v-app-bar-title>
        <router-link class="text--white" to="/">
          <span
              class="header_logo"
          >
             Служба балансов
          </span>
        </router-link>
      </v-app-bar-title>

      <v-spacer/>

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
        <v-slide-y-reverse-transition mode="out-in">
          <router-view/>
        </v-slide-y-reverse-transition>
      </v-container>
    </v-main>
    <v-slide-y-reverse-transition>
      <my-footer
          v-if="isShowFooter"
      />
    </v-slide-y-reverse-transition>
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
import MyFooter from "../components/MainLayout/MyFooter";

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
    MyFooter,
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

    isShowFooter: function () {
      return this.$route.name === 'Introduction';
    }
  },

}
</script>

<style lang="sass" scoped>
.app
  background: black

.header_logo
  font-size: 1.25rem
  color: white
  text-transform: uppercase
  font-weight: bold
</style>