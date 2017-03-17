<template>
    <div id="fullscreen">
        <cam :url="url" :name="name"></cam>
    </div>
</template>

<script>
  import Cam from './Cam.vue';
  export default {
    components: {
        Cam
    },
    data () {
      return {
        url: '',
        name: ''
      };
    },
    methods: {},
    created: function () {
      this.subPath = window.location.hash.replace('#/', '');
      const storageAdress = window.location.hash.replace('#/', '');
      chrome.storage.sync.get([storageAdress], (result) => {
        this.url = result[storageAdress].url;
        this.name = result[storageAdress].name;
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .image:hover:after {
        opacity: 0!important;
    }
</style>