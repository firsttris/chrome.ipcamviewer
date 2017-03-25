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
                        <ConnectionsDropdown v-on:selectConnection="selectConnection"  v-on:clear="clear" :connections="connections" :resetConnection="resetConnection"></ConnectionsDropdown>
                        <CameraModelDropdown v-on:selectCameraModel="selectCameraModel" v-on:resetCameraName="resetCameraName" :parentCameraName="cameraName"></CameraModelDropdown>
                        <CameraTypeDropdown v-on:selectCameraUrl="selectCameraUrl" v-on:resetCameraType="resetCameraType" :parentCameraTypes="cameraTypes" :parentCameraType="cameraType"></CameraTypeDropdown>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="name" class="col-2 col-form-label">Name</label>
                    <div class="col-10">
                        <input class="form-control" type="text" placeholder="Camera Name" id="name" v-model="name">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="ipaddress" class="col-2 col-form-label">Address</label>
                    <div class="col-10">
                        <input class="form-control" type="text" placeholder="Ip-Address" id="ipaddress"
                               v-model="ipaddress">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="url" class="col-2 col-form-label">Url</label>
                    <div class="col-10">
                        <input class="form-control" type="text" placeholder="Url" id="url" v-model="getUrl">
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
                        <button type="button" class="btn btn-secondary" @click="save(true)">Copy</button>
                        <button type="button" class="btn btn-secondary" @click="deleteConnection">Delete</button>
                        <button type="button" class="btn btn-secondary" @click="save(false)">Save</button>
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
                        <ColumnsDropdown></ColumnsDropdown>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">FPS</label>
                    <div class="col-10">
                        <FpsDropdown></FpsDropdown>
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
                        <button type="button" class="btn btn-secondary" @click="exportConnections">Export to JSON
                        </button>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Restore</label>
                    <div class="col-10">
                        <label class="btn btn-secondary" for="my-file-selector">
                            <input id="my-file-selector" type="file" style="display:none;" @change="importConnections">
                            Import JSON
                        </label>
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
  import ConnectionsDropdown from './ConnectionsDropdown.vue';
  import CameraTypeDropdown from './CameraTypeDropdown.vue';
  import CameraModelDropdown from './CameraModelDropdown.vue';
  import FpsDropdown from './FpsDropdown.vue';
  import ColumnsDropdown from './ColumnsDropdown.vue';
  export default {
    components: {
      MySource,
      ConnectionsDropdown,
      CameraTypeDropdown,
      CameraModelDropdown,
      FpsDropdown,
      ColumnsDropdown
    },
    data () {
      return {
        name: '',
        ipaddress: '',
        url: '',
        cameraTypes: {},
        cameraUrl: '',
        cameraType: '',
        cameraName:'',
        username: '',
        password: '',
        connections: [],
        resetConnection: false
      };
    },
    computed: {
      getUrl: {
        get(){
          if (this.cameraUrl !== '') {
            this.url = 'http://' + this.ipaddress + this.cameraUrl;
          }
          return this.url;
        },
        set(val){
          this.url = val;
        },
      }
    },
    methods: {
      resetCameraName() {
        this.cameraName = '';
        this.cameraType = '';
      },
      resetCameraType() {
        this.cameraType = '';
      },
      selectCameraModel(params) {
        this.cameraType = '';
        this.cameraTypes = params.cameraTypes;
        this.cameraName = params.cameraName;
      },
      selectCameraUrl(param) {
        this.cameraUrl = param.cameraUrl;
        this.cameraType = param.cameraType;
      },
      selectConnection(connection) {
        this.resetConnection = false;
        this.name = connection.name;
        this.url = connection.url;
        this.ipaddress = connection.ipaddress;
        this.cameraType = connection.cameraType;
        this.cameraTypes = connection.cameraTypes;
        this.cameraName = connection.cameraName;
        this.username = connection.username;
        this.password = connection.password;
        this.selectedIndex = this.connections.indexOf(connection);
      },
      clear() {
        this.name = '';
        this.url = '';
        this.cameraUrl = '';
        this.cameraType = '';
        this.cameraName = '';
        this.cameraTypes = {};
        this.ipaddress = '';
        this.username = '';
        this.password = '';
        this.selectedIndex = '';
        this.resetConnection = true;
      },
      save(copy) {
        const connection = {
          name: this.name,
          url: this.url,
          ipaddress: this.ipaddress,
          username: this.username,
          password: this.password,
          cameraType: this.cameraType,
          cameraTypes: this.cameraTypes,
          cameraName: this.cameraName
        };
        if (this.selectedIndex !== '' && copy === false) {
          this.connections[this.selectedIndex] = connection;
        } else {
          for (const index in this.connections) {
            if (this.connections[index].name === this.name) {
              alert("Name must be unique!");
              return;
            }
          }
          this.connections.push(connection);
        }
        this.saveConnections();
      },
      saveConnections() {
        chrome.storage.sync.set({"connections": this.connections}, () => {
          this.clear();
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
      importConnections(e) {
        const files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        const file = files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsText(file, "UTF-8");
          reader.onload = (evt) => {
            const newConnections = JSON.parse(evt.target.result);
            this.connections = this.connections.concat(newConnections);
            this.saveConnections();
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
          this.saveConnections();
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