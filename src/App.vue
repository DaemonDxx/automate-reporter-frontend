<template>
  <v-app
      :style="{background: $vuetify.theme.themes.light.background}"
  >
    <router-view>

    </router-view>
    <notifications
    />
  </v-app>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {ACTION_UPDATE_USER_INFO} from "@/store/authStore";

export default {
  name: 'App',

  components: {
  },

  data: () => ({

  }),

  methods: {
    ...mapActions([ACTION_UPDATE_USER_INFO])
  },

  computed: {
    ...mapGetters(['isAuth'])
  },

  async beforeMount() {
    if (this.isAuth) {
      await this[ACTION_UPDATE_USER_INFO]();
    }
  }
};
</script>
