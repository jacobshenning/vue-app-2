<template>
  <div id="dashboard">
    <Header />
    <div class='container py-4'>
      <div class='row justify-content-center'>
        <div class='col-lg-3 col-md-4 mb-2'>
          <DashNav />
        </div>
        <div class='col-lg-9 col-md-8'>
          <div class='card'>
            <div class='card-header'>Profile</div>

            <div v-if="loading" class='progress loading-bar-tall'>
              <div class='progress-bar progress-bar-striped progress-bar-animated'></div>
            </div>
            <div v-else class='progress'>
              <div class='progress-bar'></div>
            </div>

            <div class='card-body'>
              <p> Name: {{user.name}} </p>
              <p> Email: {{user.email}} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../../Sections/Navs/Header'
  import DashNav from '../../Sections/Navs/DashNav'
  export default {
    data: function () {
      return {
        user: {},
        loading: false,
      }
    },
    mounted() {
      this.loading = true
      if (!window.api_token) {
        this.$router.push('/login')
      }
      axios
        .get('/api/auth/user')
        .then(response => {
          this.user = response.data
          this.loading = false
        })
        .catch(error => {
          this.$router.push('/login')
        })
    },
    components: {
      Header,
      DashNav
    },
  }
</script>

<style></style>
