import { useStore } from "../provider/StoreProvider";

export const ButtonGroup = () => {
  const { createNewConnection } = useStore();
  return (
    <div class="form-group row mt-2">
      <label class="col-3 col-form-label" />
      <div class="col-9">
      <button type="button" class="btn btn-secondary" onClick={() => createNewConnection()}>New</button>
      <button type="button" class="btn btn-secondary ms-2" onClick={() => {}}>Copy</button>
        <button type="button" class="btn btn-secondary ms-2" onClick={() => {} }>Delete</button>
        <button type="button" class="btn btn-secondary ms-2" onClick={() => {}}>Delete All</button>
      </div>
    </div>
  );
}