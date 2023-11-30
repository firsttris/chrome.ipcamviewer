import { ButtonGroup } from "./ButtonGroup";
import { Dropdown } from "./Dropdown";
import { ExportImport } from "./ExportImport";
import { InputField } from "./InputField";

export const Settings = () => {

  return (
    <div class="container pt-3">
      <div class="row">
        <div class="col-12">
          <h3 class="mt-2 mb-2">Connections</h3>
          <Dropdown dropdownLabel="Connections" options={[]} selectedValue="" onSelect={() => {}}/>
          <Dropdown dropdownLabel="CameraModel" options={[]} selectedValue="" onSelect={() => {}}/>
          <Dropdown dropdownLabel="CameraType" options={[]} selectedValue="" onSelect={() => {}}/>
          <InputField id="name" label="Name" placeholder="Camera Name" />
          <InputField id="address" label="Address" placeholder="Address" />
          <InputField id="url" label="URL" placeholder="URL" />
          <InputField id="username" label="Username" placeholder="Username" />
          <InputField id="password" label="Password" placeholder="Password" type="password" />
          <ButtonGroup />

        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <h3>Viewer Settings</h3>
          <Dropdown dropdownLabel="Columns" options={[]} selectedValue="" onSelect={() => {}}/>
        </div>
      </div>
      <ExportImport />
    </div>
  );
};