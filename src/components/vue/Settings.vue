<template>
  <div class="container pt-3">
    <div class="row">
      <div class="col-12">
        <h3 class="mt-2 mb-2">Connections</h3>
        <ConnectionsDropdown v-on:selectConnection="selectConnection" v-on:reset="reset" :connections="connections"
          :resetConnection="resetConnection"></ConnectionsDropdown>
        <CameraModelDropdown v-on:selectCameraModel="selectCameraModel" v-on:resetCameraName="resetCameraName"
          :parentCameraName="cameraName"></CameraModelDropdown>
        <CameraTypeDropdown v-on:selectCameraUrl="selectCameraUrl" v-on:resetCameraType="resetCameraType"
          :parentCameraTypes="cameraTypes" :parentCameraType="cameraType"></CameraTypeDropdown>
        <InputField id="name" label="Name" placeholder="Camera Name" v-model="name" />
        <InputField id="address" label="Address" placeholder="Address" v-model="address" />
        <InputField id="url" label="URL" placeholder="URL" v-model="url" />
        <InputField id="username" label="Username" placeholder="Username" v-model="username" />
        <InputField id="password" label="Password" placeholder="Password" type="password" v-model="password" />
        <ButtonGroup :deleteOne="() => { showDeleteOneModal = true }" :deleteAll="() => { showDeleteAllModal = true }"
          :copy="() => { save(true) }" :save="() => { save(false) }" :isDeleteDisabled="isDeletedDisabled"
          :isDeleteAllDisabled="isDeletedAllDisabled" :isCopyDisabled="isDeletedDisabled"
          :isSaveDisabled="isSaveDisabled" />

      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3>Viewer Settings</h3>
        <ColumnsDropdown></ColumnsDropdown>
        <FpsDropdown></FpsDropdown>
      </div>
    </div>
    <ExportImport :connections="connections" />
    <br><br>
    <MySource></MySource>
    <DeleteConfirmationPopup :headerText="'Delete Connection'" :bodyText="'Are you sure you want to delete ' + name + '?'"
      :confirmAction="deleteConnection" :showModal="showDeleteOneModal" />

    <DeleteConfirmationPopup :headerText="'Delete all Connections'"
      :bodyText="'Are you sure you want to delete all Connections?'" :confirmAction="deleteAllConnections"
      :showModal="showDeleteAllModal" />
  </div>
</template>

<script>
import ButtonGroup from './ButtonGroup.vue';
import DeleteConfirmationPopup from './DeleteConfirmationPopup.vue';
import InputField from './InputField.vue';
import ExportImport from './ExportImport.vue';
import MySource from './Source.vue';
import ConnectionsDropdown from './ConnectionsDropdown.vue';
import CameraTypeDropdown from './CameraTypeDropdown.vue';
import CameraModelDropdown from './CameraModelDropdown.vue';
import FpsDropdown from './FpsDropdown.vue';
import ColumnsDropdown from './ColumnsDropdown.vue';
import CustomPopup from './Popup.vue';
import { createNotification } from './../js/notification';
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
  data() {
    return {
      name: '',
      ipaddress: '',
      url: '',
      cameraTypes: { jpg: '' },
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
      if (this.selectedIndex === 0) {
        return false;
      }
      return !this.selectedIndex
    },
    isDeletedAllDisabled: function () {
      return (!this.connections.length);
    },
    getUrl: {
      get() {
        if (this.cameraUrl) {
          this.url = 'http://' + this.ipaddress + this.cameraUrl;
        }
        return this.url;
      },
      set(val) {
        this.url = val;
      },
    }
  },
  methods: {
    resetFields(fields) {
      fields.forEach(field => this[field] = '');
    },
    resetCameraName() {
      this.resetFields(['cameraName', 'cameraType', 'cameraUrl', 'url']);
    },
    resetCameraType() {
      this.resetFields(['cameraType', 'cameraUrl', 'url']);
    },
    selectCameraModel(params) {
      this.resetFields(['cameraType', 'cameraUrl', 'url']);
      this.cameraTypes = params.cameraTypes;
      this.cameraName = params.cameraName;
    },
    selectCameraUrl(param) {
      this.cameraUrl = param.cameraUrl;
      this.cameraType = param.cameraType;
    },
    selectConnection(connection) {
      this.resetConnection = false;
      Object.keys(connection).forEach(key => {
        this[key] = connection[key];
      });
      this.selectedIndex = this.connections.indexOf(connection);
    },
    reset() {
      this.resetFields(['name', 'url', 'cameraUrl', 'cameraType', 'cameraName', 'ipaddress', 'username', 'password', 'selectedIndex']);
      this.cameraTypes = { jpg: '', mjpg: '' };
      this.resetConnection = true;
    },
    save(copy) {
      const connection = {
        ...this.$data,
        cameraTypes: this.cameraTypes,
        cameraName: this.cameraName
      };
      if (this.selectedIndex !== '' && copy === false) {
        this.connections[this.selectedIndex] = connection;
      } else {
        if (this.connections.find(conn => conn.name === this.name)) {
          alert("Name must be unique!");
          return;
        }
        this.connections.push(connection);
      }
      this.saveConnections();
    },
    saveConnections() {
      localStorage.setItem('connections', JSON.stringify(this.connections));
      chrome.storage.sync.set({ "connections": this.connections }, () => {
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
    loadLocalStorage() {
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