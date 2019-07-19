<template>
  <div id="message-box">
    <Header />
    <div class='container py-4'>
      <div class='row justify-content-center'>
        <div class='col-lg-3 col-md-4 mb-2'>
          <DashNav />
        </div>
        <div class='col-lg-9 col-md-8'>
          <div class='card'>
            <div class='card-header'>Chat</div>

            <div v-if="loading" class='progress loading-bar-tall'>
              <div class='progress-bar progress-bar-striped progress-bar-animated'></div>
            </div>
            <div v-else class='progress'>
              <div class='progress-bar'></div>
            </div>

            <div class='card-body'>
              <div id="chat-box">
                <div id="chat-content">
                  <div v-for="message in messages" :key="message.id" class='row' v-bind:class="{'flex-row-reverse': message.user.id === user.id}">
                    <div class='col-7'>
                      <div class='alert' v-bind:class="{'alert-secondary': message.user.id !== user.id, 'alert-primary': message.user.id === user.id}" role="alert">
                        <strong>{{message.user.name}}</strong>
                        <p class='p-0 m-0'>{{message.message}}</p>
                      </div>
                    </div>
                    <div class='col-5'>
                      <div class='alert text-right'>
                        <small class="text-muted">{{ message.created_at }}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form>
              <div class="input-group">
                <input
                  id="message"
                  type='text'
                  class='form-control form-control-lg'
                  v-bind:class="{ 'is-invalid': errors.message.length }"
                  placeholder="Message..."
                  name="message"
                  v-model="form.message"
                />
                <div class="input-group-append">
                  <button v-on:click="handleCreateNewMessage" class="btn btn-primary px-4" type="submit">Send</button>
                </div>
              </div>
            </form>
            <span v-if="errors.message.length" class='invalid-feedback'>
              <strong>{{ errors.message[0] }}</strong>
            </span>
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
        messages: [],
        form: {
          message: ''
        },
        errors: {
          message: []
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
      this.loadMessages()
    },
    methods: {
      loadMessages: function() {
        axios.get('/api/messages/all').then(response => {
          this.messages = response.data
          this.loading = false
          var chatBox = document.getElementById('chat-box');
          chatBox.scrollTop = chatBox.scrollHeight;
        }).catch(error => {
          console.log(error)
        })
      },
      handleCreateNewMessage: function(event) {
        event.preventDefault()

        this.loading = true

        axios
          .post('/api/messages/create', this.form)
          .then(response => {
            this.form.message = ''
            this.loadMessages()
          })
          .catch(error => {
            this.errors.message = error.response.data.message !== undefined ? error.response.data.message : []
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
