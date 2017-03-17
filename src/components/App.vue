<template>
  <div class="routing">
    <p>
      <i class="fa fa-github" aria-hidden="true"></i>
      <a href="https://github.com/firsttris/chrome.removereload" target="_blank">Source Code</a>
      &nbsp;
      <i class="fa fa-copyright" aria-hidden="true"></i>
      <a href="https://teufel-it.de" target="_blank" class="homepage">teufel-it.de</a>
    </p>
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item" @click="settings = false, cams = true">
        <router-link class="nav-link" v-bind:class="{ active: cams }" data-toggle="tab" role="tab" to="/">Cam</router-link>
      </li>
      <li class="nav-item" @click="settings = true, cams = false">
        <router-link class="nav-link" v-bind:class="{ active: settings }" data-toggle="tab" role="tab" to="/settings">Settings</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" role="tab" @click="goFullscreen">Messages</a>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        cams: true,
        settings: false
      };
    },
    methods: {
      goFullscreen() {
        chrome.windows.update(0, { state: "fullscreen" })
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: black;
  }
  a:hover {
    text-decoration: none;
    color: red;
  }
  .routing {
    margin-top: 20px
  }
  .nav {
    margin-bottom: 10px;
  }
  .fa {
    color: red;
  }
</style>
<style lang="css" src="./../../node_modules/bootstrap/dist/css/bootstrap.css">
</style>
<style lang="css" src="./../../node_modules/font-awesome/css/font-awesome.css">
</style>