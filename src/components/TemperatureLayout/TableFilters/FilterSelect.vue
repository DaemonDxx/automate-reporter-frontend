<template>
  <v-container class="mb-n3">
    <slot>

    </slot>
    <v-select
        v-model="selectedItems"
        :items="items"
        dense
        multiple
        outlined
        @change="updateFilter"
    >

      <template v-slot:item="{ item, on, attrs }">
        <v-list-item
            @click="selectItem(item,on)"
            v-bind="attrs"
            :disabled="!isItemAccessable(item)"
        >
          <v-list-item-action>
            <v-icon :color="isSelectedItem(item)?'blue' :''">{{getIconItem(item)}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{item}}
          </v-list-item-content>
        </v-list-item>
      </template>

      <template v-slot:prepend-item>
        <v-list-item
          @click="toggle"
        >
          <v-list-item-icon>
            <v-icon :color="selectedItems.length > 0?'blue': ''">
              {{icon}}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Выбрать все
          </v-list-item-content>
        </v-list-item>
      </template>

      <template v-slot:selection='{ item, index }'>
        <span v-if="selectedItems.length === 1">{{item}}</span>
        <span v-else-if="index === 0">Выбрано {{selectedItems.length}} эл.</span>
      </template>

    </v-select>
  </v-container>
</template>

<script>
export default {
  name: "FilterSelect",
  props: [
      'fieldReturn',
      'items',
      'accessibleItems'
  ],
  data: () => {
    return {
      selectedItems: []
    }
  },
  methods: {
    toggle() {
      if (this.likeAllItems)
        this.selectedItems = [];
      else
        this.selectedItems = this.accessibleItems.slice();
      this.updateFilter(this.selectedItems);
    },

    getIconItem(item) {
      if (!this.isItemAccessable(item)) {
        return 'mdi-checkbox-blank-off-outline';
      } else if (!this.isSelectedItem(item)) {
        return 'mdi-checkbox-blank-outline';
      } else {
        return 'mdi-check-box-outline';
      }
    },

    isSelectedItem(item) {
      return this.selectedItems.includes(item);
    },

    isItemAccessable(item) {
      return this.accessibleItems.includes(item)
    },

    selectItem(item, fn) {
      if (this.isItemAccessable(item)) {
        fn.click(item);
      }
    },

    updateFilter(value) {
      this.$emit('update', {
        field: this.fieldReturn,
        value
      })
    }


  },

  computed: {
    likeAllItems() {
      return this.selectedItems.length === this.accessibleItems.length;
    },

    likeSomeItems() {
      return this.selectedItems.length > 0 && this.selectedItems.length < this.accessibleItems.length
    },

    icon() {
      if (this.likeAllItems) return 'mdi-close-box'
      if (this.likeSomeItems) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },

  beforeMount() {
    this.selectedItems = this.accessibleItems.slice();
  },

  watch: {
    accessibleItems: function (value) {
      this.selectedItems = value;
      this.updateFilter(value);
    }
  }
}
</script>

<style scoped>

</style>