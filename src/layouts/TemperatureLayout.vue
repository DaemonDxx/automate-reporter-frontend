<template>
  <v-container>

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