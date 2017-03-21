<template>
    <div class="settings container-fluid">
        <div class="row">
            <h1>Ipcamviewer Settings</h1>
        </div>

        <div class="row">
            <div class="col-6">
                <h3>Connections</h3>
                <div class="form-group row">
                    <label for="url" class="col-2 col-form-label">Select</label>
                    <div class="col-10">
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button"
                                    @click="dropdown = !dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ getConnection }}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"
                                 v-bind:class="{ show: dropdown }">
                                <a class="dropdown-item" @click="clear(connection), dropdown = !dropdown">Create New</a>
                                <a class="dropdown-item" v-for="connection in connections"
                                   @click="selectConnection(connection), dropdown = !dropdown">{{connection.name}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="name" class="col-2 col-form-label">Camera Name</label>
                    <div class="col-10">
                        <input class="form-control" type="text" placeholder="Camera Name" id="name" v-model="name">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="url" class="col-2 col-form-label">Jpeg url</label>
                    <div class="col-10">
                        <input class="form-control" type="text" placeholder="Url" id="url" v-model="url">
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
                        <input class="form-control" type="password" placeholder="Password" id="password"
                               v-model="password">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label"></label>
                    <div class="col-10">
                        <button type="button" class="btn btn-secondary" @click="createConnection">Create</button>
                        <button type="button" class="btn btn-secondary" @click="deleteConnection">Delete</button>
                        <button type="button" class="btn btn-secondary" @click="save">Save</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <h3>Viewer Settings</h3>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Columns</label>
                    <div class="col-10">
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button"
                                    @click="dropdownColumns = !dropdownColumns" aria-haspopup="true"
                                    aria-expanded="false">
                                {{numberOfCols}}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"
                                 v-bind:class="{ show: dropdownColumns }">
                                <a class="dropdown-item"
                                   @click="numberOfCols = 2,dropdownColumns = !dropdownColumns">2</a>
                                <a class="dropdown-item"
                                   @click="numberOfCols = 3,dropdownColumns = !dropdownColumns">3</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">FPS</label>
                    <div class="col-10">
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button"
                                    @click="dropdownFps = !dropdownFps" aria-haspopup="true" aria-expanded="false">
                                {{fps}}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"
                                 v-bind:class="{ show: dropdownFps }">
                                <a class="dropdown-item" @click="fps = 0.5,dropdownFps = !dropdownFps">0.5</a>
                                <a class="dropdown-item" @click="fps = 1,dropdownFps = !dropdownFps">1</a>
                                <a class="dropdown-item" @click="fps = 2,dropdownFps = !dropdownFps">2</a>
                                <a class="dropdown-item" @click="fps = 3,dropdownFps = !dropdownFps">3</a>
                                <a class="dropdown-item" @click="fps = 4,dropdownFps = !dropdownFps">4</a>
                                <a class="dropdown-item" @click="fps = 5,dropdownFps = !dropdownFps">5</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label"></label>
                    <div class="col-10">
                        <button type="button" class="btn btn-secondary" @click="saveColumns">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <h3>Backup & Restore</h3>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Backup</label>
                    <div class="col-10">
                        <button type="button" class="btn btn-secondary" @click="exportConnections">Export to JSON</button>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Restore</label>
                    <div class="col-10">
                        <label class="btn btn-secondary" for="my-file-selector">
                            <input id="my-file-selector" type="file" style="display:none;" @change="onFileChange">
                            Import JSON
                        </label>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label"></label>
                    <div class="col-10">
                        <button type="button" class="btn btn-secondary" @click="saveArray">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <br><br>
        <MySource></MySource>
    </div>
</template>

<script>
  import FileSaver from 'file-saver';
  import MySource from './Source.vue';
  export default {
    components: {
      MySource
    },
    data () {
      return {
        fps: 1,
        numberOfCols: 2,
        dropdown: false,
        dropdownColumns: false,
        dropdownFps: false,
        name: '',
        url: '',
        username: '',
        password: '',
        connections: []
      };
    },
    computed: {
      getConnection: function () {
        if (this.name === '') {
          return 'Camera'
        } else {
          return this.name;
        }
      }
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
      save() {
        if (this.name === '' || this.url === '' || this.username === '' || this.password === '') {
          alert("Some fields are empty!");
          return;
        }
        this.connections[this.selectedIndex] = {
          name: this.name,
          url: this.url,
          username: this.username,
          password: this.password
        };
        chrome.storage.sync.set({"connections": this.connections}, () => {
          this.clear();
        });
      },
      saveColumns() {
        chrome.storage.sync.set({"columns": this.numberOfCols}, () => {
        });
        chrome.storage.sync.set({"fps": this.fps}, () => {
        });
      },
      saveArray() {
        chrome.storage.sync.set({"connections": this.connections}, () => {
          this.clear();
        });
      },
      createConnection() {
        if (this.name === '' || this.url === '' || this.username === '' || this.password === '') {
          alert("Some fields are empty!");
          return;
        }
        for (const index in this.connections) {
          if (this.connections[index].name === this.name) {
            alert("Name must be unique!");
            return;
          }
        }
        const connection = {name: this.name, url: this.url, username: this.username, password: this.password};
        this.connections.push(connection);
        chrome.storage.sync.set({"connections": this.connections}, () => {
          this.clear();
        });
        chrome.storage.sync.set({"columns": this.numberOfCols}, () => {
        });
      },
      deleteConnection() {
        this.connections.splice(this.selectedIndex, 1);
        chrome.storage.sync.set({"connections": this.connections}, () => {
          this.clear();
        });
      },
      exportConnections() {
        const blob = new Blob([JSON.stringify(this.connections, null, 4)], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "ipcamviewer-export.json");
      },
      onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        const file = files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsText(file, "UTF-8");
          reader.onload = (evt) => {
            this.connections = JSON.parse(evt.target.result);
          };
          reader.onerror = (evt) => {
            console.log("error reading file " + evt);
          }
        }
      }
    },
    created: function () {
      chrome.storage.sync.get(["connections"], (result) => {
        if (result && result.connections) {
          this.connections = result.connections;
        } else {
          this.saveArray();
        }
      });
      chrome.storage.sync.get(["columns"], (result) => {
        if (result && result.columns) {
          this.numberOfCols = result.columns;
        } else {
          this.saveColumns();
        }
      });
      chrome.storage.sync.get(["fps"], (result) => {
        if (result && result.fps) {
          this.fps = result.fps;
        } else {
          this.saveColumns();
        }
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .settings {
        padding-top: 15px;
        padding-left: 35px;
        height: 100%;
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