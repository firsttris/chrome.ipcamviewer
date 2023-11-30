<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button"
                aria-haspopup="true" aria-expanded="false" @click="dropdown = !dropdown">
            {{fps}}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"
             :class="{ show: dropdown }">
            <a class="dropdown-item" @click="selectFps(0.5)">0.5</a>
            <a class="dropdown-item" @click="selectFps(1)">1</a>
            <a class="dropdown-item" @click="selectFps(2)">2</a>
            <a class="dropdown-item" @click="selectFps(3)">3</a>
            <a class="dropdown-item" @click="selectFps(4)">4</a>
            <a class="dropdown-item" @click="selectFps(5)">5</a>
        </div>
    </div>
</template>

<script>
  import {createNotification} from './../js/notification';
  export default {
    props: [],
    data () {
      return {
        dropdown: false,
        fps: 1
      };
    },
    computed: {
    },
    created: function () {
      const fps = localStorage.getItem('fps');
      if(fps) {
        this.fps = fps
      } else {
        this.saveFps();
      }
    },
    methods: {
      selectFps: function (fps) {
        this.dropdown = !this.dropdown;
        this.fps = fps;
        this.saveFps();
      },
      saveFps: function () {
        localStorage.setItem('fps', this.fps);
        createNotification("Settings Saved");
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .show {
        display: block;
    }

    .hidden {
        display: none;
    }
</style>
