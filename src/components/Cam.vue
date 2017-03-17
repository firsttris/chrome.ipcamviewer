<template>
    <div class="image" :data-content="name" @click="isFullscreen = !isFullscreen">
        <img :id='name' :alt="name" :src='url'
             v-bind:class="{ fullscreen: isFullscreen }">
    </div>
</template>

<script>
  export default {
    components: {},
    props: ['url', 'name'],
    data () {
      return {
        isFullscreen: false
      };
    },
    methods: {},
    created: function () {
      const interval = 1; //Interval in seconds, to retrieve images
      setInterval(() => {
        var now = new Date();
        document.getElementById(this.name).src = this.url + '?' + now.getTime();
      }, interval * 1000);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .fullscreen {
        width: 1920px;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 1000;
    }
    .image {
        position: relative;
    }
    .image img {
        width: 100%;
    }
    .image:after {
        content: attr(data-content);
        text-align: center;
        color: #fff;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        opacity: 0;
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
    }

    .image:hover:after {
        opacity: 1;
    }
</style>