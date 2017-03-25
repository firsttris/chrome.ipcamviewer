<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button"
                @click="toggle()" aria-haspopup="true" aria-expanded="false">
            {{ getConnection }}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"
             v-bind:class="{ show: dropdown }">
            <a class="dropdown-item" @click="reset(), dropdown = !dropdown">Create New</a>
            <a class="dropdown-item" v-for="connection in connections"
               @click="selectConnection(connection)">{{connection.name}}</a>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['connections', 'resetConnection'],
    data () {
      return {
        dropdown: false,
        connection: {},
      };
    },
    computed: {
      getConnection: function () {
        if (this.resetConnection) {
          this.reset();
        }
        if (this.connection.name && this.connection.name !== '') {
          return this.connection.name
        } else {
          return 'Camera';
        }
      }
    },
    methods: {
      selectConnection: function (connection) {
        this.dropdown = !this.dropdown;
        this.connection = connection;
        this.$emit('selectConnection', connection)
      },
      reset: function () {
        this.connection = {};
        this.$emit('clear')
      },
      toggle: function () {
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
