<template>
  <v-card>
    <v-card-title
        class="blue"
    >
        <span class="registration-view__title">
          БАЛАНСЫ
        </span>
      <v-spacer></v-spacer>
      <v-btn
          class="link-back"
          link
          plain
          @click="$router.push('/auth/reg')"
      >
          Регистрация
      </v-btn>
    </v-card-title>

    <v-form
        @submit.prevent="login"
    >
    <v-card-text
      class="mt-3"
    >
        <v-text-field
            v-model="username"
            dense
            outlined
            :error-messages="usernameError"
            label="Логин"
            placeholder="Ivanov"
        >
        </v-text-field>
        <v-text-field
            v-model="password"
            dense
            outlined
            type="password"
            :error-messages="passwordError"
            placeholder="*********"
            label="Пароль"
        ></v-text-field>
    </v-card-text>

    <v-card-actions
    >
      <v-spacer></v-spacer>
      <v-btn
        outlined
        type="submit"
        color="orange darken-3"
        :disabled="isSendRequest"
      >
        Войти
      </v-btn>
    </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";
import {mapActions} from "vuex";
import {ACTION_LOGIN} from "@/store/authStore";

export default {
  name: "LoginView",
  data: () => {
    return {
      username: '',
      password: '',
      isSendRequest: false,
    }
  },
  methods: {
    ...mapActions([ACTION_LOGIN]),

    async login() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.isSendRequest = true;
        const result = await this[ACTION_LOGIN]({
          username: this.username,
          password: this.password,
        });
        if (result) await this.$router.push('/');
        this.isSendRequest = false;
      }
    }
  },
  computed: {
    usernameError: function () {
      const errors = [];
      if (!this.$v.username.required && this.$v.username.$dirty) errors.push('Это поле не должно быть пустым');
      return errors;
    },
    passwordError: function () {
      const errors = [];
      if (!this.$v.password.required && this.$v.password.$dirty) errors.push('Это поле не должно быть пустым');
      return errors;
    },
  },
  validations: {
    username: {
      required
    },
    password: {
      required
    }
  },
  mixins: [validationMixin]
}
</script>

<style lang="sass" scoped>
.registration-view__title
  color: white

.link-back
  color: white
  text-decoration: none
</style>