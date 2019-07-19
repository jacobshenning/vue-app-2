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
          <div class='card-header'>Create new project</div>
          <div v-if="loading" class='progress loading-bar-tall'>
            <div class='progress-bar progress-bar-striped progress-bar-animated'></div>
          </div>
          <div v-else class='progress'>
            <div class='progress-bar'></div>
          </div>
          <div class='card-body'>

            <form>
              <div class='form-group'>
                <label htmlFor='name'>Project name</label>
                <input
                  id='name'
                  type='text'
                  class='form-control form-control-lg'
                  v-bind:class="{ 'is-invalid': errors.name.length }"
                  name='name'
                  autoComplete="off"
                  v-model="form.name"
                />
                <span v-if="errors.name.length" class='invalid-feedback'>
                  <strong>{{ errors.name[0] }}</strong>
                </span>
              </div>

              <div class='form-group'>
                <label htmlFor='description'>Project description</label>
                <textarea
                  id='description'
                  type='text'
                  class='form-control form-control-lg'
                  v-bind:class="{ 'is-invalid': errors.description.length }"
                  name='description'
                  autoComplete="off"
                  v-model="form.description"
                  rows='10'
                />

                <span v-if="errors.name.length" class='invalid-feedback'>
                  <strong>{{ errors.name[0] }}</strong>
                </span>
              </div>

              <button v-on:click="handleCreateProjectAttempt($event)" class='btn btn-primary'>Create</button>
            </form>

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
        form: {
          name: '',
          description: ''
        },
        errors: {
          name: [],
          description: [],
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
          this.loading = false
        })
        .catch(error => {
          this.$router.push('/login')
        })
    },
    methods: {

      updateErrors: function(errors) {
        this.errors.name = errors.name !== undefined ? errors.name : []
        this.errors.description = errors.description !== undefined ? errors.description : []
      },

      handleCreateProjectAttempt: function(event) {
        event.preventDefault()

        this.loading = true

        axios
          .post('/api/projects', this.form)
          .then(response => {
            this.$router.push('/dashboard/projects')
          })
          .catch(error => {
            this.updateErrors(error.response.data.errors)
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
