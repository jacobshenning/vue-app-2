<template>
  <div id='login-request'>
    <Header />
    <div class='container py-4'>
      <div class='row justify-content-center'>
        <div class='col-md-6'>
          <div class='card'>
            <div class='card-header'>Login</div>

            <div v-if="loading" class='progress loading-bar-tall'>
              <div class='progress-bar progress-bar-striped progress-bar-animated'></div>
            </div>
            <div v-else class='progress'>
              <div class='progress-bar'></div>
            </div>

            <div class='card-body'>

              <form>

                <div class='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    type='email'
                    class='form-control form-control-lg'
                    v-bind:class="{ 'is-invalid': errors.email.length }"
                    name='email'
                    autoComplete="off"
                    v-model="form.email"
                  />

                  <span v-if="errors.email.length" class='invalid-feedback'>
                    <strong>{{ errors.email[0] }}</strong>
                  </span>
                </div>

                <div class='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    id='password'
                    type='password'
                    class='form-control form-control-lg'
                    v-bind:class="{ 'is-invalid': errors.password.length }"
                    name='password'
                    rows='10'
                    autoComplete="off"
                    v-model="form.password"
                  />

                  <span v-if="errors.password.length" class='invalid-feedback'>
                    <strong>{{ errors.password[0] }}</strong>
                  </span>

                </div>

                <div class="form-group form-check">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    class="form-check-input"
                    v-model="remember"
                    />
                  <label class="form-check-label" htmlFor="remember">Stay logged in</label>
                </div>

                <button v-on:click="handleLoginAttempt($event)" class='btn btn-primary'>Log in</button>
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
  export default {
    data: function () {
      return {
        form: {
          email: '',
          password: '',
        },
        errors: {
          email: [],
          password: [],
        },
        remember: false,
        loading: false,
      }
    },
    mounted() {
      if (window.api_token) {
        this.$router.push('/dashboard')
      }
    },
    components: {
      Header
    },
    methods: {

      updateErrors: function(errors) {
        this.errors.email = errors.email !== undefined ? errors.email : []
        this.errors.password = errors.password !== undefined ? errors.password : []
      },

      saveCookie: function(token) {
        var now = new Date()
        var offset = this.remember ? 90 * 24 * 3600 * 1000 : 3600 * 1000
        now.setTime(now.getTime() + offset)
        document.cookie = "api_token=" + token +  "; expires=" + now.toUTCString() + "; path=/"
      },

      handleLoginAttempt: function(event) {
        event.preventDefault()

        this.loading = true

        axios
          .post('/api/auth/login', this.form)
          .then(response => {
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data
            window.api_token = response.data

            this.saveCookie(response.data)

            this.$router.push('/dashboard')
          })
          .catch(error => {
            this.updateErrors(error.response.data.errors)
            this.loading = false
          })
      }
    }
  }
</script>
