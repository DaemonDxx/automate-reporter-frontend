<template>
    <router-view>

    </router-view>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {ACTION_UPDATE_USER_INFO} from "@/store/auth";

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
