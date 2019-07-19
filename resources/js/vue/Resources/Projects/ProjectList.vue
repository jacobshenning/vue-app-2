<template>
  <div id="project-list">
  <Header />
    <div class='container py-4'>
      <div class='row justify-content-center'>
        <div class='col-lg-3 col-md-4 mb-2'>
          <DashNav />
        </div>
        <div class='col-lg-9 col-md-8'>
          <div class='card'>
            <div class='card-header'>All projects</div>
            <div v-if="loading" class='progress loading-bar-tall'>
              <div class='progress-bar progress-bar-striped progress-bar-animated'></div>
            </div>
            <div v-else class='progress'>
              <div class='progress-bar'></div>
            </div>
            <div class='card-body'>
              <router-link class='btn btn-primary btn-sm mb-3' to='/dashboard/projects/create'>
                Create new project
              </router-link>

              <ul id="v-for-projects" class='list-group list-group-flush'>
                <router-link
                  v-for="project in projects"
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  v-bind:to="{path: '/dashboard/projects/' + project.id}"
                  v-bind:key="project.id"
                  exact
                >
                  {{ project.name }}
                  <span class='badge badge-primary badge-pill'>
                    {{ project.tasks_count }}
                  </span>
                </router-link>
              </ul>
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
        projects: [],
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
      axios
        .get('/api/projects')
        .then(response => {
          this.projects = response.data
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    components: {
      Header,
      DashNav
    },
  }
</script>

<style></style>
