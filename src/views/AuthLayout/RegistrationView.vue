<template>
  <v-container
  >
    <v-card>
      <v-card-title
        class="blue"
      >
        <span class="registration-view__title">
          Регистрация
        </span>
        <v-spacer></v-spacer>
        <v-btn
            class="link-back"
            link
            plain
            @click="$router.push('/auth/login')"
        >
          Вход
        </v-btn>
      </v-card-title>
      <v-card-text class="mt-3">
        <v-form
          @submit.prevent="registration"
        >
          <v-text-field
              v-model="username"
              dense
              outlined
              :error-messages="usernameError"
              label="Логин"
              hint="Не меньше 4 символов"
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
              hint="Какой угодно, лишь бы запомнить"
              label="Придумайте пароль"
          ></v-text-field>
          <v-text-field
              v-model="repeatPassword"
              dense
              outlined
              :error-messages="repeatPasswordError"
              type="password"
              label="Повторите пароль"
          ></v-text-field>
          <v-text-field
              v-model="key"
              dense
              outlined
              :error-messages="keyError"
              hint="Потому что только для своих"
              label="Пригласительный ключ"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          outlined
          block
          color="orange darken-3"
          @click="registration"
          :loading="isSendRequest"
        >
          Зарегистрироваться
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import {ACTION_REGISTRATION_USER} from "@/store/authStore";
import {
  required,
  minLength,
  maxLength,

} from 'vuelidate/lib/validators';
import {validationMixin} from "vuelidate";
import sameAs from "vuelidate/lib/validators/sameAs";

export default {
  name: "RegistrationView",
  data: () => {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      key: '',
      isSendRequest: false
    }
  },
  methods: {
    ...mapActions([ACTION_REGISTRATION_USER]),

    async registration() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.isSendRequest = true;
        const result = await this[ACTION_REGISTRATION_USER]({
            username: this.username,
            password: this.password,
            key: this.key,
        });
        this.isSendRequest = false;
        if (result)
          setTimeout(() => {
                this.$router.push('/auth/login');
          }, 1000);
      }
    }
  },

  computed: {
    usernameError: function () {
      const errors = [];
      if (this.$v.username.$dirty && this.$v.username.$error) {
        if (!this.$v.username.required) errors.push('Это поле не должно быть пустым');
        if (!this.$v.username.minLength) errors.push('Минимальное число символов - 4');
        return errors;
      }
     return undefined;
    },
    passwordError: function () {
      const errors = [];
      if (this.$v.password.$dirty && this.$v.password.$error) {
        if (!this.$v.password.required) errors.push('Это поле не должно быть пустым');
        if (!this.$v.password.minLength) errors.push('Минимальное число символов - 4');
        return errors;
      }
      return undefined;
    },
    repeatPasswordError: function () {
      const errors = [];
      if (this.$v.repeatPassword.$dirty && this.$v.repeatPassword.$error) {
        if (!this.$v.repeatPassword.sameAs) errors.push('Пароли не совпадают');
        return errors;
      }
      return undefined;
    },
    keyError: function () {
      const errors = [];
      if (this.$v.key.$dirty && this.$v.key.$error) {
        if (!this.$v.key.required) errors.push('Это поле не должно быть пустым');
        return errors;
      }
      return undefined;
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(10),
    },
    password: {
      required,
      minLength: minLength(4),
    },
    repeatPassword: {
      required,
      sameAs: sameAs('password')
    },
    key: {
      required
    }
  },
  mixins: [
      validationMixin
  ]
}
</script>

<style lang="sass" scoped>
.registration-view__title
  color: white

.link-back
  color: white
  text-decoration: none
</style>