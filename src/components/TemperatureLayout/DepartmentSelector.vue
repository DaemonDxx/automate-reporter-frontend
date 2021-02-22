<template>
  <v-container>
    <div class="department-selector__title">
      Учитывать филиалы
    </div>
    <v-btn-toggle
        v-model="selected"
      multiple
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
      this.$emit('update', departments);
    }
  }
}
</script>

<style scoped>

</style>