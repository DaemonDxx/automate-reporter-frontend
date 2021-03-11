<template>
  <v-app >
      <v-app-bar
          v-if="isAuth"
          color="blue darken-2"
          app>
        <v-app-bar-nav-icon
          @click="isShowNav=!isShowNav"
        >
        </v-app-bar-nav-icon>
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
    <v-navigation-drawer
      app
      absolute
      temporary
      v-model="isShowNav"
    >
      <v-list
        dense
        nav
      >
        <v-list-item-group
          v-model="selectedRoute"
          color="primary"
        >
          <v-list-item
              v-for="item in routes.offset"
              :key="item.title"
              dense
          >
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{item.title}}
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>
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
  data: () => {
    return {
      isShowNav: false,
      routes: {
        offset: [
          {title: 'История', icon: 'mdi-database', path: '/offsets/history'},
          {title: 'Расчет', icon: 'mdi-calculator', path: '/offsets/solver'},
          {title: 'Изменение данных', icon: 'mdi-pencil-plus', path: '/offsets/changer'}
        ]
      },
      selectedRoute: {}
    }
  },
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