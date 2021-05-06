<template>
  	<header>
		<!-- Navigation -->
		<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-vuefood">
			<div class="container">
        <router-link :to="{name: 'site.home'}" class="nav-link" ><img src="@/assets/imgs/logo-vuefood.png" alt="VueFood" class="logo"></router-link>
				<div>
					<ul class="navbar-nav ml-auto">
						<li class="nav-item nav-cart active">
							<router-link :to="{name: 'site.cart'}" class="nav-link text-light" ><i class="fas fa-shopping-cart"></i> ({{produtoCart.length}})</router-link>
						</li>
						<li class="nav-item nav-cart-login" v-if="me.name">
              <p v-if="me.name" class="nav-link">
                <router-link :to="{name: 'site.auth.pedidos'}" class="text-light mr-2">Olá {{me.name}}</router-link>
                <a href="#" @click.prevent="logout" class="logout"> (Sair)</a>
              </p>
						</li>
						<li class="nav-item nav-cart" v-else>
							<router-link :to="{name: 'auth.login'}" class="nav-link text-light mr-2" >Entrar</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  computed: {
     ...mapState({
      produtoCart: state => state.cart.procucts,
      me: state => state.auth.me,
    }),

  },

  methods: {
     ...mapActions([
      'logout'
    ])
  }
}
</script>
