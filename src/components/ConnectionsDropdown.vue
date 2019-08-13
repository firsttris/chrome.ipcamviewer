<template>
  <div class="dropdown">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      aria-haspopup="true"
      aria-expanded="false"
      @click="toggle()"
    >{{ getConnection }}</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" :class="{ show: dropdown }">
      <a class="dropdown-item" @click="reset(), dropdown = !dropdown">New</a>
      <a
        v-for="connection in connections"
        class="dropdown-item"
        @click="selectConnection(connection)"
      >{{connection.name}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['connections', 'resetConnection'],
  data() {
    return {
      dropdown: false,
      connection: {}
    };
  },
  computed: {
    getConnection: function() {
      if (this.resetConnection) {
        this.reset();
      }
      if (this.connection.name) {
        return this.connection.name;
      } else {
        return 'New';
      }
    }
  },
  methods: {
    selectConnection: function(connection) {
      this.dropdown = !this.dropdown;
      this.connection = connection;
      this.$emit('selectConnection', connection);
    },
    reset: function() {
      this.connection = {};
      this.$emit('reset');
    },
    toggle: function() {
      this.dropdown = !this.dropdown;
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
