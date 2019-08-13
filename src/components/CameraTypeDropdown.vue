<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button"
                aria-haspopup="true" aria-expanded="false"
                @click="dropdown = !dropdown">
            {{getCameraType}}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"
             :class="{ show: dropdown }">
            <a class="dropdown-item" @click="resetParent()">None</a>
            <a v-for="(cameraUrl, cameraType) in parentCameraTypes" class="dropdown-item"
               @click="selectCameraUrl(cameraUrl, cameraType)">{{cameraType.toUpperCase()}}</a>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['parentCameraTypes', 'parentCameraType'],
    data () {
      return {
        dropdown: false,
        selectCameraType: '',
        selectedCameraUrl: ''
      };
    },
    computed: {
      getCameraType: function () {
        if (!this.parentCameraType) {
          this.resetLocal();
        } else {
            this.selectCameraType = this.parentCameraType;
            this.selectedCameraUrl = this.parentCameraTypes[this.parentCameraType];
        }
        if (!this.selectCameraType) {
          return 'Type';
        } else {
          return this.selectCameraType.toUpperCase()
        }
      }
    },
    methods: {
      selectCameraUrl: function (cameraUrl, cameraType) {
        this.dropdown = !this.dropdown;
        this.selectCameraType = cameraType;
        this.selectedCameraUrl = cameraUrl;
        const param = { cameraType, cameraUrl};
        this.$emit('selectCameraUrl', param)
      },
      resetLocal: function () {
        this.selectCameraType = '';
        this.selectedCameraUrl = '';
      },
      resetParent: function() {
        this.dropdown = !this.dropdown;
        this.$emit('resetCameraType')
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
