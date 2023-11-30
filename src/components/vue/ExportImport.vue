<template>
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
</template>

<script>
import FileSaver from 'file-saver';

export default {
    props: {
        connections: []
    },
    methods: {
        exportConnections() {
            const blob = new Blob([JSON.stringify(this.connections, null, 4)], { type: "text/plain;charset=utf-8" });
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
    }
}
</script>