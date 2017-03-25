<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button"
                @click="dropdown = !dropdown" aria-haspopup="true" aria-expanded="false">
            {{fps}}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"
             v-bind:class="{ show: dropdown }">
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
  export default {
    props: [],
    data () {
      return {
        dropdown: false,
        fps: 1
      };
    },
    computed: {
      getLabel: function () {
        if (this.selectedCameraName !== '') {
          return this.selectedCameraName
        } else {
          return 'Present';
        }
      }
    },
    methods: {
      selectFps: function (fps) {
        this.dropdown = !this.dropdown;
        this.fps = fps;
        this.saveFps();
      },
      saveFps: function () {
        chrome.storage.sync.set({"fps": this.fps}, () => {
        });
      }
    },
    created: function () {
      chrome.storage.sync.get(["fps"], (result) => {
        if (result && result.fps) {
          this.fps = result.fps;
        } else {
          this.saveFps();
        }
      });
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
