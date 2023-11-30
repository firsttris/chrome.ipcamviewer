<template>
    <CustomPopup v-if="showModal" @close="showModal = false">
      <h3 slot="header">{{ headerText }}</h3>
      <div slot="body">{{ bodyText }}</div>
      <div slot="footer">
        <button @click="showModal = false" class="btn btn-secondary">No</button>
        <button @click="confirmAction, showModal = false" class="btn btn-secondary">Yes</button>
      </div>
    </CustomPopup>
  </template>
  
  <script>
  export default {
    props: {
      headerText: String,
      bodyText: String,
      confirmAction: Function,
      showModal: Boolean
    }
  }
  </script>