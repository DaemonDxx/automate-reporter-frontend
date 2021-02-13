<template>
  <v-select
      outlined

    solo
    flat
    item-value="_id"
    :disabled="isEmptyArray"
    v-model="selectedFile"
    :items="files"
  >
    <template v-slot:prepend-inner
    >
      <v-avatar
          size="40"
          class="ml-n1 mr-1"
          :color="colorAvatar"
      >
        <span class="white--text">{{`${department[0]}Э`}} </span>
      </v-avatar>
    </template>

    <template v-slot:selection="{item}">
      <span class="">{{`Версия файла ${item.version}`}}</span>
    </template>

    <template  v-slot:item="data">
      <v-list-item v-on="data.on" v-bind="data.attrs">
        <div class="item">
          <div class="item__text">
            {{`Версия - ${data.item.version}`}}
          </div>
          <div class="item__status" :class="getStatusColor(data.item)">
          </div>
        </div>
      </v-list-item>

    </template>

  </v-select>
</template>

<script>
export default {
  name: "MyFileChips",
  data: () => {
    return {
      file: null,
    }
  },
  props: [
      'department',
      'files'
  ],

  methods: {
    getStatusColor(file) {
      return file.valueErrors?.length > 0? 'have-error': 'have-not-error';
    }
  },

  computed: {

    selectedFile: {
      set: function (value) {
        this.file = this.files.filter((item) => {
          return item._id === value;
        })[0];
      },

      get: function () {
        if (this.files.length > 0) {
          return  this.files.filter(item => item.isActive)[0];
        } else {
         return  null;
        }
      }
    },

    isEmptyArray() {
      return this.files?.length === 0;
    },

    colorAvatar() {
      if (this.files?.length === 0 || !this.selectedFile)
          return 'blue-grey lighten-3';
      if (this.file?.errors?.length !== 0) {
        return 'light-green';
      } else {
        return 'red darken-1'
      }
    }
  },
}
</script>

<style lang="sass" scoped>
.item
  display: flex
  justify-content: space-between
  width: 100%
  &__text


  &__status
    align-self: center
    width: 8px
    height: 8px
    border-radius: 50%

.have-error
  background-color: #EF5350

.have-not-error
  background-color: #8BC34A

</style>