<template>
    <div>
        <Camera :url="url" :type="type" :name="name" :username="username" :password="password" singlefull="true"></Camera>
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
        type: '',
        name: '',
        username: '',
        password: '',
      };
    },
    created: function () {
      const storageAdress = this.$route.path.replace('/', '');
      const storedConnectionString = localStorage.getItem(storageAdress);
      if(storedConnectionString) {
        const storedConnection = JSON.parse(storedConnectionString);
        this.url = storedConnection.url;
        this.name = storedConnection.name;
        this.password = storedConnection.password;
        this.username = storedConnection.username;
        this.type = storedConnection.type;
      }
    },
    methods: {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .image:hover:after {
        opacity: 0!important;
    }
</style>