<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent>
      <v-text-field v-model="login" :rules="rulesLogin" label="Логин" />
      <v-text-field v-model="password" :rules="rulesPass" label="Пароль" type="password" />
      <v-btn v-if="!loading" @click="checkData" type="submit" block class="mt-2">Войти</v-btn>
      <v-btn v-if="loading" disabled type="submit" block class="mt-2">
        <v-progress-circular color="primary" indeterminate="disable-shrink" size="16" width="2">
        </v-progress-circular>
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script>

export default {
  name: 'LoginForm',

  components: {
  },

  data: () => ({
    login: '',
    password: '',
    loading: false,
    rulesLogin: [
      value => {
        if (value) {
          return true
        }

        if (value.length < 5) {
          return 'Ваш логин должен быть больше 5 символов'
        }

        return 'Поле не должно быть пустым'
      },
    ],
    rulesPass: [
      value => {
        if (value) {
          return true
        }

        if (value.length < 5) {
          return 'Ваш пароль должен быть больше 5 символов'
        }

        return 'Поле не должно быть пустым'
      },
    ],
  }),
  methods: {
    async checkData() {
      this.loading = true;
      if (this.login == '' || this.password == '') {
        this.loading = false;
        return
      }

      let userData = {
        login: this.login,
        password: this.password,
      }

      // this.$store.commit("LOGIN", userData)

      let res = await this.$store.dispatch("login", userData)
      if (res) {
        this.loading = false;
      }

      console.log(res)

      if (this.$store.state.user.curUser != '') {
        this.$router.push('/')
      }
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.v-btn--loading {
  pointer-events: none;
}

.v-btn--loading .v-btn__content {
  color: transparent !important;
}
</style>
