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
          <form>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" v-model="data.name" name="name" class="form-control input_user" placeholder="Nome"/>
            </div>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
              </div>
              <input type="email" v-model="data.email" name="email" class="form-control input_user" placeholder="E-mail"/>
            </div>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input type="password" v-model="data.password" name="password" class="form-control input_pass" placeholder="Senha"/>
            </div>
            <div class="d-flex justify-content-center login_container">
              <button type="button" name="button" class="btn login_btn" :disabled="loading" @click.prevent="registerClient">
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
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      loading: false,
      data: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'register'
    ]),

    registerClient () {
      this.loading = true
       this.register(this.data)
         .then(response =>{
           console.log(response)
         })
         .catch(response => {
           this.$toast.error("Fallha ao carregar as registrar")
         }).finally(() => this.loading = false);
    }
  },
}
</script>
