<template>
  <div id="single-project">
    <Header />
    <div class='container py-4'>
      <div class='row justify-content-center'>
        <div class='col-lg-3 col-md-4 mb-2'>
          <DashNav />
        </div>
        <div class='col-lg-9 col-md-8'>
          <div class='card'>
            <div class='card-header'>{{project.name}}</div>

            <div v-if="loading" class='progress loading-bar-tall'>
              <div class='progress-bar progress-bar-striped progress-bar-animated'></div>
            </div>
            <div v-else class='progress'>
              <div class='progress-bar'></div>
            </div>

            <div class='card-body'>
              <p>{{project.description}}</p>

              <button
                class='btn btn-primary btn-sm'
                v-on:click="handleMarkProjectAsCompleted"
              >
                Mark as completed
              </button>

              <hr />

              <form>
                <div class='input-group'>
                  <input
                    type='text'
                    name='title'
                    class='form-control form-control-lg'
                    v-bind:class="{ 'is-invalid': errors.title.length }"
                    placeholder='Task title'
                    v-model="form.title"
                  />

                  <div class='input-group-append'>
                    <button v-on:click="handleCreateNewTask($event)" class='btn btn-primary'>Add</button>
                  </div>

                </div>
              </form>

              <ul class='list-group mt-3'>
                <li
                  class='list-group-item d-flex justify-content-between align-items-center'
                  v-for="task in project.tasks"
                  :key="task.id"
                >
                  {{task.title}}

                  <button
                    class='btn btn-primary btn-sm'
                    v-on:click="handleMarkTaskAsCompleted($event, task.id)"
                  >
                    Mark as completed
                  </button>
                </li>
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
        project: {},
        form: {
          title: ''
        },
        errors: {
          title: []
        },
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
        })
        .catch(error => {
          this.$router.push('/login')
        })
      this.loadProject()
    },
    methods: {
      loadProject: function() {
        axios
          .get('/api/projects/' + this.$route.params.id)
          .then(response => {
            this.project = response.data
            this.loading = false
          })
          .catch(error => {
            this.$router.push('/dashboard/projects')
          })
      },
      handleMarkProjectAsCompleted: function(event) {
        this.loading = true
        axios
          .put('/api/projects/' + this.$route.params.id)
          .then(response => this.$router.push('/dashboard/projects'))
          .catch(error => {
            this.loading = false
          })
      },
      handleMarkTaskAsCompleted: function(event, id) {
        this.loading = true

        axios
          .put('/api/projects/' + this.$route.params.id + '/tasks/' + id)
          .then(response => {
            this.loadProject()
          })
      },
      handleCreateNewTask: function(event) {
        event.preventDefault()

        this.loading = true

        axios
          .post('/api/projects/' + this.$route.params.id + '/tasks', this.form)
          .then(response => {
            this.form.title = ''
            this.loadProject()
          })
          .catch(error => {
            console.log(error.response.data)
            this.errors.title = error.response.data.errors.title !== undefined ? error.response.data.errors.title : []
            this.loading = false
          })
      }
    },
    components: {
      Header,
      DashNav
    },
  }
</script>

<style></style>
