<template>
  <div id="home">
    <Header />
    <div class='container py-4'>
      <div class='row justify-content-center'>
        <div class='col-md-8'>
          <h1 class='display-4 d-none d-md-inline-block pb-1'>Vue Application</h1>
          <h1 class='d-inline-block d-md-none mb-1'>Vue Application</h1>
          <p class='lead'>A new Vue Application structure designed to be sustainable for full SPA</p>
          <div class='card'>
            <div class='card-header'>Scalable Structure</div>
            <div class='progress'>
              <div class='progress-bar'></div>
            </div>
            <div class='card-body'>
              <p> By using a new scalable structure which is able to mirror Laravel Http namespacing, this app is capable of building out a SPA to the full extent of Laravel API</p>
              <div class="btn-group btn-block d-none d-md-flex">
                <router-link class="btn btn-outline-primary" to='/structure'>Checkout Structure</router-link>
                <router-link class="btn btn-outline-primary" to='/register'>Create Account</router-link>
                <router-link class="btn btn-outline-primary" to='/dashboard'>Visit Dashboard</router-link>
                <a class="btn btn-outline-primary" href='https://github.com/jacobshenning/vue-app' target='_blank'>GitHub</a>
              </div>
              <div class="btn-group-vertical btn-block d-flex d-md-none">
                <router-link class="btn btn-outline-primary" to='/structure'>Checkout Structure</router-link>
                <router-link class="btn btn-outline-primary" to='/register'>Create Account</router-link>
                <router-link class="btn btn-outline-primary" to='/dashboard'>Visit Dashboard</router-link>
                <a class="btn btn-outline-primary" href='https://github.com/jacobshenning/vue-app' target='_blank'>GitHub</a>
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
