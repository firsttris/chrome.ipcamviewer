<template>
    <div class="multiview container-fluid">
        <div class="noConnections" v-if="noConnections">
            <br>
            <h1>No Cameras</h1>
            <br>
            <button type="button" class="btn btn-secondary" @click="openSettings">Setup Connections</button>
        </div>
        <div class="row flex" v-for="row in rows">
            <div v-for="connection in row" :class="getLayout">
                <Camera :url="connection.url" :name="connection.name" :username="connection.username"
                        :password="connection.password" :type="connection.cameraType"></Camera>
            </div>
        </div>
    </div>
</template>

<script>
  import Camera from './Camera.vue';
  export default {
    components: {
      Camera
    },
    data () {
      return {
        noConnections: false,
        connections: [],
        columns: 2,
        rows: []
      };
    },
    methods: {
      openSettings: function () {
        chrome.tabs.create({'url': chrome.extension.getURL('options.html#/')}, function (tab) {
          // Tab opened.
        });
      }
    },
    computed: {
      getLayout: function () {
        if (this.columns === '2') {
          return 'col-6';
        }
        if (this.columns === '3') {
          return 'col-4';
        }
      }
    },
    created: function () {
      this.columns = localStorage.getItem('columns');
      chrome.storage.sync.get(["connections"], (response) => {
        if (response && response.connections) {
          if (response.connections.length === 0) {
            this.noConnections = true;
          }
          const connections = response.connections;
          let results = [];
          while (connections.length > 0) {
            results.push(connections.splice(0, this.columns))
          }
          this.rows = results;
        } else {
          this.noConnections = true;
        }
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .noConnections {
        color: white;
    }

    .multiview {
        height: 100%;
        background-color: black;
    }

    .col-4, .col-6 {
        padding-left: 0px;
        padding-right: 0px;
    }
</style>
<style>
    html {
        background: black;
    }
</style>