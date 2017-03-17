<template>
    <div class="multiview">
        <row>
            <cam url="http://teufel.uk.to:89/axis-cgi/jpg/image.cgi" name="cam1"></cam>
            <cam url="http://20.1.0.11:80/axis-cgi/jpg/image.cgi" name="cam2"></cam>
        </row>
        <row>
            <cam url="http://20.1.0.12:80/axis-cgi/jpg/image.cgi" name="cam3"></cam>
        </row>

    </div>
</template>

<script>
  import Cam from './Cam.vue';
  export default {
    components: {
      Cam
    },
    data () {
      return {};
    },
    methods: {},
    created: function () {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .multiview {
        display: inline-flex;
    }
</style>