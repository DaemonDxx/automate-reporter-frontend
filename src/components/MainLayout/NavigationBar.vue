<template>
  <v-container>
    <v-card class="elevation-0 pl-3 pr-3 rounded-lg">
      <v-row>
        <v-col
            v-for="item in items"
            :key="item.title"
            cols="12"
            md="4"
        >
          <v-btn
              outlined
              block
              height="48"
              color="primary"
              :to="item.path"
              :disabled="isAccessDenied(item.accessList)"
          >
            <v-icon left>
              {{item.icon}}
            </v-icon>

            {{item.title}}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "NavigationBar",

  components: {},

  data: () => {
    return {
      activeLink: [],

    }
  },

  props: {
    items: {
      type: Array,
      required: true,
      validator: function (items) {
        const validate = (item) => {
          return typeof item === 'object'
              && item.title
              && item.icon
              && item.path
        }
        return items.every(validate);
      }
    }
  },

  methods: {
    isAccessDenied(accessList) {
      return !(accessList.includes('ALL') || accessList.includes(this.myRole));
    }
  },

  computed: {
    ...mapGetters(['myRole'])
  }
}
</script>

<style scoped>

</style>