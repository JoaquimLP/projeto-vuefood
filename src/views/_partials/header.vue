<template>
  	<header>
		<!-- Navigation -->
		<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-vuefood">
			<div class="container">
        <router-link :to="{name: 'site.home'}" class="nav-link" ><img src="@/assets/imgs/logo-vuefood.png" alt="VueFood" class="logo"></router-link>
				<div>
					<ul class="navbar-nav ml-auto">
						<li class="nav-item nav-cart active">
							<router-link :to="{name: 'site.cart'}" class="nav-link" ><i class="fas fa-shopping-cart"></i> ({{produtoCart.length}})</router-link>
						</li>
						<li class="nav-item nav-cart">
							<router-link :to="{name: 'auth.login'}" class="nav-link" >Entrar</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
     ...mapState({
      produtoCart: state => state.cart.procucts
    })
  },
}
</script>
