<template>
  <div>
   <!-- login -->
    <div class="d-flex justify-content-center h-100 my-5">
      <div class="user_card">
        <div class="d-flex justify-content-center">
          <div class="brand_logo_container">
            <router-link :to="{name: 'site.home'}"><img src="@/assets/imgs/vue-food.png" class="brand_logo" alt="Logo"></router-link>
          </div>
        </div>
        <div class="d-flex justify-content-center form_container">
          <form  @submit.prevent="auth" method="POST">
            <div class="is-invalid input_user" v-if="errors.password != ''">
              {{errors.email[0] || 'Erro não informado'}}
            </div>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
              </div>
              <input type="email" v-model="data.email" name="email" :class="['form-control', 'input_user', {'is-invalid': errors.email != ''}]" placeholder="E-mail">
            </div>
             <div class="is-invalid input_user" v-if="errors.password != ''">
              {{errors.password[0] || 'Erro não informado'}}
            </div>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input type="password" v-model="data.password" name="password" :class="['form-control', 'input_pass', {'is-invalid': errors.password != ''}]" placeholder="Senha">
            </div>
            <div class="d-flex justify-content-center mt-3 login_container">
              <button type="submit" name="button" class="btn login_btn" :disabled="loading">
                <span v-if="loading">Carrgando....</span>
                <span v-else>Entrar</span>
              </button>
            </div>
          </form>
        </div>

        <div class="mt-4">
          <div class="d-flex justify-content-center links">
            Não tem uma conta? <router-link :to="{name: 'auth.register'}" class="ml-2"> Cadastre-se!</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- login-->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    deviceName() {
      return navigator.appCodeName + navigator.appName + navigator.platform + navigator.appVersion + this.data.email
    }
  },
  data() {
    return {
      loading: false,
      data: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),

    auth () {
      this.reset()
      this.loading = true;

      const params = {
        device_name: this.deviceName,
        ...this.data,
      }

      this.login(params)
        .then((response) => {
          this.$toast.success("Login efetuado com sucesso");//
          this.$router.push({name: 'site.auth.pedidos'})
        })
        .catch((error) => {
          const response = error.response;

          if (response.status == 422) {
            this.errors = Object.assign(this.errors, response.data.errors)
            this.$toast.error("Dados inválidos");
            setTimeout(() => this.reset(), 4000)
            return;
          }
          this.$toast.error("Fallha ao fazer login");
        })
        .finally(() => (this.loading = false));
    },
    reset() {
      this.errors = {
        email: "",
        password: "",
      }
    },
  },
};
</script>
