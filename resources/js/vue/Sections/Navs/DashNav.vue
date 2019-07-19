<template>
  <ul class="list-group card">
    <div class="card-header">Menu</div>
    <div class='progress'>
      <div class='progress-bar'></div>
    </div>
    <router-link class="list-group-item border-0" exact to='/dashboard'>Dashboard</router-link>
    <router-link class="list-group-item border-0" exact to='/dashboard/profile'>Profile</router-link>
    <router-link class="list-group-item border-0" to='/dashboard/projects'>Projects</router-link>
    <router-link class="list-group-item border-0" exact to='/dashboard/chat'>Chat</router-link>
  </ul>
</template>

<script>
  export default {
  }
</script>

<style></style>
