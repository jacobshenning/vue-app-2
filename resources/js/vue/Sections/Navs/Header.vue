<template>
  <nav class="navbar py-3 navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <router-link class='navbar-brand' to='/'>Vue App</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class='nav-link' to='/' exact>Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class='nav-link' to='/structure' exact>Structure</router-link>
        </li>
      </ul>
      <hr class="bg-light" />
      <ul v-if="api_token" class="navbar-nav">
        <li class="nav-item">
          <router-link class='nav-link' to='/dashboard' exact>Dashboard</router-link>
        </li>
        <li class="nav-item" >
          <a v-on:click="handleLogout($event)" class='nav-link' href="#" exact>Logout</a>
        </li>
      </ul>
      <ul v-else class="navbar-nav">
        <li class="nav-item" >
          <router-link class='nav-link' to='/login' exact>Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class='nav-link' to='/register' exact>Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    data: function () {
      return {
        api_token: false
      }
    },
    mounted: function() {
     if (window.api_token) {
       this.api_token = true
     }
   },
   methods: {
     handleLogout: function(event) {
       event.preventDefault()
       window.api_token = false
       document.cookie = "api_token=false; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
       this.$router.push('/')
     }
   }
  }
</script>

<style></style>
