<template>
    <div class="settings">
        <div class="row">
            <div class="col-12">
                <h3>Connections</h3>
                <div class="form-group row">
                    <label for="url" class="col-3 col-form-label">Camera</label>
                    <div class="col-9">
                        <ConnectionsDropdown v-on:selectConnection="selectConnection" v-on:reset="reset"
                                             :connections="connections"
                                             :resetConnection="resetConnection"></ConnectionsDropdown>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="url" class="col-3 col-form-label">Model</label>
                    <div class="col-9">
                        <CameraModelDropdown v-on:selectCameraModel="selectCameraModel"
                                             v-on:resetCameraName="resetCameraName"
                                             :parentCameraName="cameraName"></CameraModelDropdown>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="url" class="col-3 col-form-label">Type *</label>
                    <div class="col-9">
                        <CameraTypeDropdown v-on:selectCameraUrl="selectCameraUrl"
                                            v-on:resetCameraType="resetCameraType" :parentCameraTypes="cameraTypes"
                                            :parentCameraType="cameraType"></CameraTypeDropdown>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="name" class="col-3 col-form-label">Name *</label>
                    <div class="col-9">
                        <input class="form-control" type="text" placeholder="Camera Name" id="name" v-model="name">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="ipaddress" class="col-3 col-form-label">Address *</label>
                    <div class="col-9">
                        <input class="form-control" type="text" placeholder="Ip-Address" id="ipaddress"
                               v-model="ipaddress">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="url" class="col-3 col-form-label">Url *</label>
                    <div class="col-9">
                        <input class="form-control" type="text" placeholder="Url" id="url" v-model="getUrl">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="username" class="col-3 col-form-label">Username *</label>
                    <div class="col-9">
                        <input class="form-control" type="text" placeholder="Username" id="username" v-model="username">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-3 col-form-label">Password *</label>
                    <div class="col-9">
                        <input class="form-control" type="password" placeholder="Password" id="password"
                               v-model="password">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 col-form-label"></label>
                    <div class="col-9">
                        <button type="button" class="btn btn-secondary" @click="showDeleteOneModal = true"
                                :disabled="isDeletedDisabled">Delete
                        </button>
                        <button type="button" class="btn btn-secondary" @click="showDeleteAllModal = true"
                                :disabled="isDeletedAllDisabled">Delete All
                        </button>
                        <button type="button" class="btn btn-secondary" @click="save(true)"
                                :disabled="isDeletedDisabled">Copy
                        </button>
                        <button type="button" class="btn btn-secondary" @click="save(false)" :disabled="isSaveDisabled">
                            Save
                        </button>
                    </div>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3>Viewer Settings</h3>
                <div class="form-group row">
                    <label class="col-3 col-form-label">Columns</label>
                    <div class="col-9">
                        <ColumnsDropdown></ColumnsDropdown>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 col-form-label">FPS</label>
                    <div class="col-9">
                        <FpsDropdown></FpsDropdown>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3>Export & Import</h3>
                <div class="form-group row">
                    <label class="col-3 col-form-label">Backup</label>
                    <div class="col-9">
                        <button type="button" class="btn btn-secondary" @click="exportConnections">Export JSON
                        </button>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-3 col-form-label">Restore</label>
                    <div class="col-9">
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
        <CustomPopup v-if="showDeleteOneModal" @close="showDeleteOneModal = false">
            <h3 slot="header">Delete Connection</h3>
            <div slot="body">Are you sure you want to delete {{name}}?</div>
            <div slot="footer">
                <button @click="showDeleteOneModal = false" class="btn btn-secondary">No</button>
                <button v-on:click="deleteConnection(), showDeleteOneModal = false" class="btn btn-secondary">Yes
                </button>
            </div>
        </CustomPopup>
        <CustomPopup v-if="showDeleteAllModal" @close="showDeleteAllModal = false">
            <h3 slot="header">Delete all Connections</h3>
            <div slot="body">Are you sure you want to delete all Connections?</div>
            <div slot="footer">
                <button @click="showDeleteAllModal = false" class="btn btn-secondary">No</button>
                <button v-on:click="deleteAllConnections(), showDeleteAllModal = false" class="btn btn-secondary">Yes
                </button>
            </div>
        </CustomPopup>
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
  import CustomPopup from './Popup.vue';
  import {createNotification} from './../js/notification';
  export default {
    components: {
      MySource,
      ConnectionsDropdown,
      CameraTypeDropdown,
      CameraModelDropdown,
      FpsDropdown,
      ColumnsDropdown,
      CustomPopup
    },
    data () {
      return {
        name: '',
        ipaddress: '',
        url: '',
        cameraTypes: {jpg: '', mjpg: ''},
        cameraUrl: '',
        cameraType: '',
        cameraName: '',
        username: '',
        password: '',
        connections: [],
        selectedIndex: '',
        resetConnection: false,
        showDeleteOneModal: false,
        showDeleteAllModal: false
      };
    },
    computed: {
      isSaveDisabled: function () {
        return (!this.name || !this.username || !this.password || !this.url || !this.cameraType);
      },
      isDeletedDisabled: function () {
        if(this.selectedIndex === 0) {
          return false;
        }
        return !this.selectedIndex
      },
      isDeletedAllDisabled: function () {
        return (!this.connections.length);
      },
      getUrl: {
        get(){
          if (this.cameraUrl) {
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
        this.cameraUrl = '';
        this.url = '';
      },
      resetCameraType() {
        this.cameraType = '';
        this.cameraUrl = '';
        this.url = '';
      },
      selectCameraModel(params) {
        this.cameraType = '';
        this.cameraUrl = '';
        this.url = '';
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
        if (connection.ipaddress) {
          this.ipaddress = connection.ipaddress;
        }
        this.cameraUrl = connection.cameraUrl;
        this.cameraType = connection.cameraType;
        if (connection.cameraTypes) {
          this.cameraTypes = connection.cameraTypes;
        }
        this.cameraName = connection.cameraName;
        this.username = connection.username;
        this.password = connection.password;
        this.selectedIndex = this.connections.indexOf(connection);
      },
      reset() {
        this.name = '';
        this.url = '';
        this.cameraUrl = '';
        this.cameraType = '';
        this.cameraName = '';
        this.cameraTypes = {jpg: '', mjpg: ''};
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
          cameraUrl: this.cameraUrl,
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
        localStorage.setItem('connections', JSON.stringify(this.connections));
        chrome.storage.sync.set({"connections": this.connections}, () => {
          createNotification("Settings Saved");
          this.reset();
        });
      },
      deleteConnection() {
        this.connections.splice(this.selectedIndex, 1);
        this.saveConnections();
      },
      deleteAllConnections() {
        this.connections = [];
        this.saveConnections();
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
      },
      loadLocalStorage: function () {
        const connectionsString = localStorage.getItem('connections');
        if (connectionsString) {
          this.connections = JSON.parse(connectionsString);
        }
      }
    },
    created: function () {
      this.loadLocalStorage();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .settings {
        width: 500px;
    }

    .settings {
        padding-top: 15px;
        padding-left: 35px;
        height: 100%;
    }

    h3 {
        margin-top: 10px;
        margin-bottom: 10px;
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