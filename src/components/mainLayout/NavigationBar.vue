<template>
  <v-container>
    <v-card class="elevation-0 pl-3 pr-3">
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
}
</script>

<style scoped>

</style>