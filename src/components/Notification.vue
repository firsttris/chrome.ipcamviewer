<template>
  <div>
    <div class="alert alert-info info" v-bind:class="{ show: isInfoNotificationVisible }">
      <strong>Info </strong> {{ infoNotification }}
    </div>
    <div class="alert alert-success success" v-bind:class="{ show: isSuccessNotificationVisible }">
      <strong>Success </strong> {{ successNotification }}
    </div>
    <div class="alert alert-warning warning" v-bind:class="{ show: isWarningNotificationVisible }">
      <strong>Warning </strong> {{ warningNotification }}
    </div>
  </div>
</template>
<script>
  export default {
    props: [],
    data () {
      return {
        infoNotification: '',
        successNotification: '',
        warningNotification: '',
        isSuccessNotificationVisible: false,
        isWarningNotificationVisible: false,
        isInfoNotificationVisible: false
      };
    },
    methods: {
      showInfoNotification: function (message) {
        this.infoNotification = message;
        this.isInfoNotificationVisible = true;
        setTimeout(() => {
          this.isInfoNotificationVisible = false;
        }, 3000);
      },
      showSuccessNotification: function (message) {
        this.successNotification = message;
        this.isSuccessNotificationVisible = true;
        setTimeout(() => {
          this.isSuccessNotificationVisible = false;
        }, 3000);
      },
      showWarningNotification: function (message) {
        this.warningNotification = message;
        this.isWarningNotificationVisible = true;
        setTimeout(() => {
          this.isWarningNotificationVisible = false;
        }, 3000);
      }
    }
  };
</script>
<style scoped>
  .alert {
    margin-top: 20px;
    display: none;
  }
  .show {
    display: block;
  }
</style>
