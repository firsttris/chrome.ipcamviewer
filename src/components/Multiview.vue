<template>
    <div class="multiview container-fluid">
        <div class="row flex" v-for="row in rows">
            <div v-for="connection in row" :class="getLayout">
                <cam :url="connection.url" :name="connection.name" :username="connection.username"
                     :password="connection.password"></cam>
            </div>
        </div>
    </div>
</template>

<script>
  import Cam from './Cam.vue';
  export default {
    components: {
      Cam
    },
    data () {
      return {
        connections: [],
        columns: 2,
        rows: []
      };
    },
    methods: {},
    computed: {
      getLayout: function () {
        if(this.columns === 2) {
          return 'col-6';
        }
        if(this.columns === 3) {
          return 'col-4';
        }
      }
    },
    created: function () {
      chrome.storage.sync.get(["columns"], (result) => {
        if (result && result.columns) {
          this.columns = result.columns;
        }
        chrome.storage.sync.get(["connections"], (response) => {
          if (response && response.connections) {
            const connections = response.connections;
            let results = [];
            while (connections.length > 0) {
              results.push(connections.splice(0, this.columns))
            }
            console.log(results);
            this.rows = results;
          }
        });
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .multiview {
        height:100%;
        background-color: black;
    }
    .col-4,.col-6 {
        padding-left: 0px;
        padding-right: 0px;
    }
</style>