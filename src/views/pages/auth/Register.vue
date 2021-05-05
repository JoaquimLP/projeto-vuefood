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
          <form @submit.prevent="registerClient" method="POST">
            <div class="is-invalid input_user" v-if="errors.name != ''">
              {{errors.name[0] || 'Erro não informado'}}
            </div>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" v-model="data.name" name="name" :class="['form-control', 'input_user', {'is-invalid': errors.name != ''}]" placeholder="Nome"/>
            </div>
            <div class="is-invalid input_user" v-if="errors.email != ''">
              {{errors.email[0] || 'Erro não informado'}}
            </div>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
              </div>
              <input type="email" v-model="data.email" name="email" :class="['form-control', 'input_user', {'is-invalid': errors.email != ''}]" placeholder="E-mail"/>
            </div>
            <div class="is-invalid input_user" v-if="errors.password != ''">
              {{errors.password[0] || 'Erro não informado'}}
            </div>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input type="password" v-model="data.password" name="password" :class="['form-control', 'input_user', {'is-invalid': errors.password != ''}]" placeholder="Senha"/>
            </div>
            <div class="d-flex justify-content-center login_container">
              <button type="submit" name="button" class="btn login_btn" :disabled="loading">
                <span v-if="loading">Cadastrando....</span>
                <span v-else>Cadastrar</span>
              </button>
            </div>
          </form>
        </div>

        <div class="mt-4">
          <div class="d-flex justify-content-center links">
            Já tem conta? <router-link :to="{name: 'auth.login'}" class="ml-2">Login</router-link>
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
  data() {
    return {
      loading: false,
      data: {
        name: "",
        email: "",
        password: "",
      },
      errors: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["register"]),

    registerClient() {
      this.reset()
      this.loading = true;
      this.register(this.data)
        .then((response) => {
          this.$toast.success("Cadastro realizado com sucesso");
          this.$router.push({name: 'auth.login'})
        })
        .catch((error) => {
          const response = error.response;

          if (response.status == 422) {
            this.errors = Object.assign(this.errors, response.data.errors)
            this.$toast.error("Dados inválidos");
            setTimeout(() => this.reset(), 4000)
            return;
          }
          this.$toast.error("Fallha ao carregar as registrar");
        })
        .finally(() => (this.loading = false));
    },
    reset() {
      this.errors = {
        name: "",
        email: "",
        password: "",
      }
    },
  },
};
</script>
