<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button"
                @click="dropdown = !dropdown" aria-haspopup="true"
                aria-expanded="false">
            {{getCameraType}}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"
             v-bind:class="{ show: dropdown }">
            <a class="dropdown-item" @click="resetParent()">None</a>
            <a class="dropdown-item" v-for="(cameraUrl, cameraType) in parentCameraTypes"
               @click="selectCameraUrl(cameraUrl, cameraType)">{{cameraType}}</a>
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
        if (this.parentCameraType === '') {
          this.resetLocal();
        } else {
            this.selectCameraType = this.parentCameraType;
            this.selectedCameraUrl = this.parentCameraTypes[this.parentCameraType];
        }
        if (this.selectCameraType === '' || this.selectCameraType === undefined) {
          return 'CameraType';
        } else {
          return this.selectCameraType
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
