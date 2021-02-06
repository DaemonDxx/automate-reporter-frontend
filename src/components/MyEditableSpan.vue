<template>
  <div class="editable-span">
    <div class="editable-span__text" v-if="!isEdit">
      <span>{{text}}</span>
      <v-icon
          class="ml-3"
          @click="canEdit"
      >
          mdi-pencil
      </v-icon>
    </div>

    <div class="editable-span__input" v-else>
      <v-text-field
          class="mt-n3"
          hide-details="auto"
          v-model="editText"
          @keydown="saveChange"
      >
      </v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyEditableSpan",
  data: () => {
    return {
      isEdit: false,
      editText: ''
    }
  },
  props: [
      'text',
      'field'
  ],
  methods: {
    canEdit(state) {
      this.isEdit = state;
      this.editText = this.text;
    },

    saveChange(event) {
      if (event.code === "Enter") {
        this.$emit('update', {value: this.editText, field: this.field});
        this.isEdit = !this.isEdit;
      }
    }
  }
}
</script>

<style scoped>


.editable-span {
  display: block;
  width: 100%;
}

.editable-span__text {
  display: flex;
  align-items: center;
}

.editable-span__input {
}

</style>