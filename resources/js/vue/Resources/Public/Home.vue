<template>
  <div id="home">
    <Header />
    <div class='container py-4'>
      <div class='row justify-content-center'>
        <div class='col-md-8'>
          <h1 class='display-4'>Vue Application</h1>
          <p class='lead'>A new Vue Application structure designed to be sustainable for full SPA</p>
          <div class='card'>
            <div class='card-header'>Scalable Structure</div>
            <div class='progress'>
              <div class='progress-bar'></div>
            </div>
            <div class='card-body'>
              <p> By using a new scalable structure which is able to mirror Laravel Http namespacing, this app is capable of building out a SPA to the full extent of Laravel API</p>
              <div class="btn-group" role="group" aria-label="Basic example">
                <router-link class="btn btn-outline-primary" to='/structure'>Checkout Structure</router-link>
                <router-link class="btn btn-outline-primary" to='/register'>Create Account</router-link>
                <router-link class="btn btn-outline-primary" to='/dashboard'>Visit Dashboard</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../../Sections/Navs/Header'
  export default {
    name: 'Home',
    components: {
      Header
    }
  }
</script>

<style></style>
