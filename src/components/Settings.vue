<template>
    <div class="settings container">
        <div class="form">
            <div class="form-group row">
                <label for="url" class="col-2 col-form-label">Camera Name</label>
                <div class="col-10">
                    <input class="form-control" type="text" placeholder="Camera Name" id="name" v-model="name">
                </div>
            </div>
            <div class="form-group row">
                <label for="url" class="col-2 col-form-label">Jpeg-Url</label>
                <div class="col-10">
                    <input class="form-control" type="text" placeholder="Jpeg-Url" id="url" v-model="url">
                </div>
            </div>
            <div class="form-group row">
                <label for="username" class="col-2 col-form-label">Username</label>
                <div class="col-10">
                    <input class="form-control" type="text" placeholder="Username" id="username" v-model="username">
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-2 col-form-label">Password</label>
                <div class="col-10">
                    <input class="form-control" type="password" placeholder="Password" id="password" v-model="password">
                </div>
            </div>
            <button type="button" class="btn btn-secondary" @click="saveConnection">Save</button>
            <button type="button" class="btn btn-secondary" @click="deleteConnection">Delete</button>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                        @click="dropdown = !dropdown" aria-haspopup="true" aria-expanded="false">
                    Select Connection
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" v-bind:class="{ show: dropdown }">
                    <a class="dropdown-item" @click="clear(connection), dropdown = !dropdown">Create New</a>
                    <a class="dropdown-item" v-for="connection in connections" @click="selectConnection(connection), dropdown = !dropdown">{{connection.name}}</a>
                </div>
            </div>
            <button type="button" class="btn btn-secondary" @click="exportConnections">Export</button>
            <label class="btn btn-secondary" for="my-file-selector">
                <input id="my-file-selector" type="file" style="display:none;" @change="onFileChange">
                Import
            </label>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  export default {
    components: {},
    data () {
      return {
        dropdown: false,
        name: '',
        url: '',
        username: '',
        password: '',
        connections: []
      };
    },
    methods: {
      selectConnection(connection) {
        this.name = connection.name;
        this.url = connection.url;
        this.username = connection.username;
        this.password = connection.password;
        this.selectedIndex = this.connections.indexOf(connection);
      },
      clear() {
        this.name = '';
        this.url = '';
        this.username = '';
        this.password = '';
        this.selectedIndex = '';
      },
      saveConnection() {
        const connection = { name: this.name, url: this.url, username: this.username, password: this.password };
        this.connections.push(connection);
        this.clear();
        for(const index in this.connections) {
          axios({
            method: 'post',
            url: this.connections[index].url,
            auth: {
              username: this.connections[index].username,
              password: this.connections[index].password
            }
          }).then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      deleteConnection() {
        this.connections.splice(this.selectedIndex, 1);
        this.clear();
      },
      exportConnections() {
        const FileSaver = require('file-saver');
        const blob = new Blob([JSON.stringify(this.connections,null,4)], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "ipcamviewer-export.json");
      },
      onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        const file = files[0];
        console.log(files);
        if (file) {
          const reader = new FileReader();
          reader.readAsText(file, "UTF-8");
          reader.onload = (evt) => {
            this.connections = JSON.parse(evt.target.result);
          };
          reader.onerror = (evt) => {
            console.log("error reading file "+evt);
          }
        }
      }
    },
    created: function () {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .settings {
        margin-top: 20px;
    }
    .show {
        display: block;
    }
    .dropdown {
        display: inline-block;
    }
    label {
        margin-bottom: 0px;
    }
</style>