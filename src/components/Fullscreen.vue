<template>
    <div>
        <Camera :url="url" :name="name" :username="username" :password="password" singlefull="true"></Camera>
    </div>
</template>

<script>
  import Camera from './Camera.vue';
  export default {
    components: {
      Camera
    },
    data () {
      return {
        url: '',
        name: '',
        username: '',
        password: '',
      };
    },
    methods: {},
    created: function () {
      this.subPath = window.location.hash.replace('#/', '');
      const storageAdress = window.location.hash.replace('#/', '');
      chrome.storage.sync.get([storageAdress], (result) => {
        this.url = result[storageAdress].url;
        this.name = result[storageAdress].name;
        this.username = result[storageAdress].username;
        this.password = result[storageAdress].password;
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .image:hover:after {
        opacity: 0!important;
    }
    .image img {
        width: 1920px;
    }
</style>