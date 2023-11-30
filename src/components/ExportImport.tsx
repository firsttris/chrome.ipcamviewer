import FileSaver from 'file-saver';
import { useStore } from '../provider/StoreProvider';

export const ExportImport = () => {

  const { getConnections, setConnections } = useStore();

  const exportConnections = () => {
    const blob = new Blob([JSON.stringify(getConnections(), null, 4)], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "ipcamviewer-export.json");
  };

  const importConnections = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (evt) => {
        const parsedConnections = JSON.parse((evt.target as FileReader).result as string);
        const newConnections = [...getConnections(), ...parsedConnections];
        setConnections(newConnections)
      };
      reader.onerror = (evt) => {
        console.log("error reading file " + evt);
      }
    }
  };

  return (
      <div class="row mt-4">
        <div class="col-12">
          <h3>Export & Import</h3>
          <div class="form-group row">
            <label class="col-3 col-form-label">Backup</label>
            <div class="col-9">
              <button type="button" class="btn btn-secondary" onClick={exportConnections}>Export JSON</button>
            </div>
          </div>
          <div class="form-group row mt-2">
            <label class="col-3 col-form-label">Restore</label>
            <div class="col-9">
              <input id="my-file-selector" type="file" style={{"display":"none"}} onChange={importConnections} />
              <label class="btn btn-secondary" for="my-file-selector">Import JSON</label>
            </div>
          </div>
        </div>
      </div>
  );
};