<template>
    <div class="form-group row">
        <label :for="id" class="col-3 col-form-label">{{ label }} *</label>
        <div class="col-9">
            <input class="form-control" :type="type" :placeholder="placeholder" :id="id" v-model="value">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        label: String,
        placeholder: String,
        type: {
            type: String,
            default: 'text'
        },
        value: String
    }
}
</script>