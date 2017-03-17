<template>
  <div class="routing">
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item" @click="settings = false, cams = true">
        <router-link class="nav-link" v-bind:class="{ active: cams }" data-toggle="tab" role="tab" to="/">Cam</router-link>
      </li>
      <li class="nav-item" @click="settings = true, cams = false">
        <router-link class="nav-link" v-bind:class="{ active: settings }" data-toggle="tab" role="tab" to="/settings">Settings</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" role="tab" @click="goFullscreen">Fullscreen</a>
      </li>
    </ul>
    <router-view></router-view>
    <div>
      <i class="fa fa-github" aria-hidden="true"></i>
      <a href="https://github.com/firsttris/chrome.removereload" target="_blank">Source Code</a>
      &nbsp;
      <i class="fa fa-copyright" aria-hidden="true"></i>
      <a href="https://teufel-it.de" target="_blank" class="homepage">teufel-it.de</a>
    </div>
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
        function enterFullscreen(element) {
          if(element.requestFullscreen) {
            element.requestFullscreen();
          } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
          } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          }
        }
        enterFullscreen(document.getElementById("fullscreen"));
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
  }
  .nav {
  }
  .fa {
    color: red;
  }
</style>
<style lang="css" src="./../../node_modules/bootstrap/dist/css/bootstrap.css">
</style>
<style lang="css" src="./../../node_modules/font-awesome/css/font-awesome.css">
</style>