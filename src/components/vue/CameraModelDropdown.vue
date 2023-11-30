<template>
  <div class="dropdown">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      aria-haspopup="true"
      aria-expanded="false"
      @click="dropdown = !dropdown"
    >{{getLabel}}</button>
    <div
      class="dropdown-menu"
      aria-labelledby="dropdownMenuButton"
      :class="{ show: dropdown }"
    >
      <a class="dropdown-item" @click="resetParent()">None</a>
      <a
        v-for="(cameraTypes, cameraName) in cams"
        class="dropdown-item"
        @click="selectCam(cameraTypes, cameraName)"
      >{{cameraName}}</a>
    </div>
  </div>
</template>

<script>
const cameras = require('./../data/cameraModels.json');
export default {
  props: ['parentCameraName'],
  data() {
    return {
      dropdown: false,
      cams: cameras,
      selectedCameraTypes: {},
      selectedCameraName: ''
    };
  },
  computed: {
    getLabel: function() {
      if (!this.parentCameraName) {
        this.resetLocal();
      } else {
        this.selectedCameraName = this.parentCameraName;
        this.selectedCameraTypes = this.cams[this.parentCameraName];
      }
      if (!this.selectedCameraName) {
        return 'None';
      } else {
        return this.selectedCameraName;
      }
    }
  },
  methods: {
    selectCam: function(cameraTypes, cameraName) {
      this.dropdown = !this.dropdown;
      this.selectedCameraName = cameraName;
      this.selectedCameraTypes = cameraTypes;
      const params = { cameraTypes, cameraName };
      this.$emit('selectCameraModel', params);
    },
    resetLocal: function() {
      this.selectedCameraTypes = {};
      this.selectedCameraName = '';
    },
    resetParent: function() {
      this.dropdown = !this.dropdown;
      this.$emit('resetCameraName');
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

.dropdown-menu {
  overflow: auto;
  height: auto;
  max-height: 300px;
}
</style>
