<template>
    <div class="form-group row">
      <label class="col-3 col-form-label"></label>
      <div class="col-9">
        <button type="button" class="btn btn-secondary" @click="deleteOne" :disabled="isDeleteDisabled">Delete</button>
        <button type="button" class="btn btn-secondary" @click="deleteAll" :disabled="isDeleteAllDisabled">Delete All</button>
        <button type="button" class="btn btn-secondary" @click="copy" :disabled="isCopyDisabled">Copy</button>
        <button type="button" class="btn btn-secondary" @click="save" :disabled="isSaveDisabled">Save</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      deleteOne: Function,
      deleteAll: Function,
      copy: Function,
      save: Function,
      isDeleteDisabled: Boolean,
      isDeleteAllDisabled: Boolean,
      isCopyDisabled: Boolean,
      isSaveDisabled: Boolean
    }
  }
  </script>