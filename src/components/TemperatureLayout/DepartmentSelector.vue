<template>
  <v-container>
    <div class="department-selector__title">
      Учитывать филиалы
    </div>
    <v-btn-toggle
        v-model="selected"
        multiple
        @change="update"
    >
      <v-row
        no-gutters
      >
        <v-col
            v-for="department of departments"
            :key="department"
            cols="12">
          <v-btn
              class="mb-1"
              block
              small
              outlined
              :disabled="disabled"
              color="blue"
          >
            {{department}}
          </v-btn>
        </v-col>
      </v-row>
    </v-btn-toggle>
  </v-container>

</template>

<script>
export default {
  name: "DepartmentSelector",
  props: [
    'disabled'
  ],
  data: () => {
    return {
      selected: [0,1,2,3,4,5,6,7,8],

      departments: [
        '"Алтайэнерго"',
        '"Бурятэнерго"',
        '"ГАЭС"',
        '"Красноярскэнерго"',
        '"Кузбассэнерго-РЭС"',
        '"Омскэнерго"',
        '"Хакасэнерго"',
        '"Читаэнерго"',
        'АО "Тываэнерго"',
      ]
    }

  },
  methods: {
    update(departments) {
      const value = [];
      for (let index of departments) {
        value.push(this.departments[index])
      }
      this.$emit('update', {
        field: 'departments',
        value
      });
    }
  }
}
</script>

<style scoped>

</style>