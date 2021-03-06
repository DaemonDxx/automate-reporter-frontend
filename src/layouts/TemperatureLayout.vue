<template>
  <v-container>
    <v-navigation-drawer
      permanent
      absolute
      mini-variant
      expand-on-hover
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
            color="primary"
            @change="goPath"
            v-model="currentPath"
        >
          <v-list-item
              v-for="item in navItems"
              :key="item.title"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{item.title}}
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view>

    </router-view>
  </v-container>
</template>

<script>
export default {
  name: "TemperatureLayout",

  data: () => {
    return {
      navItems: [
        {title: 'История', icon: 'mdi-database', path: '/offsets/history'},
        {title: 'Расчет', icon: 'mdi-calculator', path: '/offsets/solver'},
        {title: 'Изменение данных', icon: 'mdi-pencil-plus', path: '/offsets/changer'}
      ],
      currentPath: null,
    }
  },
  methods: {
    goPath(index) {
      const path = this.navItems[index]?.path;
     if (this.$route.path !== path) {
       if (!path) {
         this.$router.push('/offsets');
       } else {
         this.$router.push(path);
       }
     }
    }
  },

  watch: {
    $route: function (v) {
      if (v.path === '/offsets') {
        this.currentPath = null;
      }
    }
  },

  computed: {
  }
}
</script>

<style scoped>

</style>