<template>
    <div class="multiview container-fluid" v-bind:class="{ fullheight: fullheight }">
        <div class="noConnections" v-if="noConnections || noTypeWarning">
            <br>
            <h1 v-if="noConnections">No Cameras</h1>
            <h1 v-if="noTypeWarning">No Type defined for Camera!</h1>
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
        noTypeWarning: false,
        fullheight: false,
        columns: 2,
        connections: [],
        rows: []
      };
    },
    methods: {
      openSettings: function () {
        chrome.tabs.create({'url': chrome.extension.getURL('options.html#/')}, function (tab) {
          // Tab opened.
        });
      },
      loadLocalStorage: function () {
        this.columns = localStorage.getItem('columns');
        const connectionsString = localStorage.getItem('connections');
        if (connectionsString) {
          this.connections = JSON.parse(connectionsString);
        }
      },
      checkConnections: function () {
        if (this.connections.length === 0) {
          this.noConnections = true;
        } else {
          this.connections.forEach((connection) => {
            if (connection.cameraType === undefined || connection.cameraType === '') {
              this.noTypeWarning = true;
            }
          });
        }
      },
      createRowsForColumns: function () {
        let results = [];
        while (this.connections.length > 0) {
          results.push(this.connections.splice(0, this.columns))
        }
        this.rows = results;
      },
    },
    computed: {
      getLayout: function () {
        if (this.columns === '2') {
          this.fullheight = false;
          return 'col-6';
        }
        if (this.columns === '3') {
          this.fullheight = true;
          return 'col-4';
        }
      }
    },
    created: function () {
      this.loadLocalStorage();
      this.checkConnections();
      this.createRowsForColumns();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .fullheight {
        height: 100%;
    }
    .noConnections {
        color: white;
    }

    .multiview {
        background: black;
    }

    .col-4, .col-6 {
        padding-left: 0px;
        padding-right: 0px;
    }
</style>