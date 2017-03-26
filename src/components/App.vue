<template>
    <div class="routing">
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    data () {
      return {};
    },
    methods: {},
    created: function () {
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    html,.routing {
        height: 100%;
    }
    .routing {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }

</style>
<style lang="css" src="./../../node_modules/bootstrap/dist/css/bootstrap.css">
</style>
<style lang="css" src="./../../node_modules/font-awesome/css/font-awesome.css">
</style>