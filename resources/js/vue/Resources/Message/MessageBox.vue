<template>
  <div id="message-box" class='pb-2'>
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

            <div class='card-body py-0'>
              <div id="chat-box" class='pt-3'>
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
                  <button v-on:click="handleCreateNewMessage" class="btn btn-primary px-4" type="submit">Send Message</button>
                </div>

                <span v-if="errors.message.length" class='invalid-feedback position-absolute mt-5'>
                  <strong>{{ errors.message }}</strong>
                </span>
              </div>
            </form>
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
        autoscroll: false,
        intervalId: null,
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
      this.autoscroll = true
      this.startInterval()
      this.loadMessages()
    },
    beforeDestroy() {
      clearInterval(this.intervalId)
    },
    methods: {
      startInterval: function () {
        this.intervalId = setInterval(this.loadMessages, 5000)
      },
      scrollToBottom: function() {
        if (this.autoscroll) {
          let chatbox = this.$el.querySelector("#chat-box")
          chatbox.scrollTop = chatbox.scrollHeight
        }
        this.autoscroll = false
      },
      loadMessages: function() {
        this.loading = true
        let chatbox = this.$el.querySelector("#chat-box")
        if (chatbox.scrollHeight - chatbox.scrollTop - chatbox.clientHeight <= 20) {
          this.autoscroll = true
        }
        axios
        .get('/api/messages/all')
        .then(response => {
          this.messages = response.data
          this.loading = false
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        }).catch(error => {
          console.log(error)
        })
      },
      handleCreateNewMessage: function(event) {
        event.preventDefault()

        this.loading = true
        this.errors.message = []

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
