import { useStore } from '../provider/StoreProvider';
import { ButtonGroup } from './ButtonGroup';
import { Dropdown } from './Dropdown';
import { ExportImport } from './ExportImport';
import { InputField } from './InputField';
import { presets } from '../data/presets';

const getPresetNames = presets.map((p) => ({ label: p.name, value: p.name }));

export const Settings = () => {
  const {
    getConnectionNames,
    setSelectedConnectionAttribute,
    getSelectedConnectionAttribute,
    setSelectedConnectionId
  } = useStore();

  return (
    <div class="container pt-3">
      <div class="row">
        <div class="col-12">
          <h3 class="mt-2 mb-2">Connections</h3>
          <Dropdown
            dropdownLabel="Connections"
            options={getConnectionNames()}
            selectedValue={getSelectedConnectionAttribute('name')}
            onSelect={(value) => value && setSelectedConnectionId(value)}
          />
          <Dropdown
            dropdownLabel="Camera Presets"
            options={getPresetNames}
            selectedValue={getSelectedConnectionAttribute('preset')}
            onSelect={(value) => {
              const preset = presets.find((p) => p.name === value);
              if (preset) {
                const url = getSelectedConnectionAttribute('streamType') === 'mjpeg' ? preset.stream.mjpg : preset.stream.jpg;
                setSelectedConnectionAttribute('url', url ?? '');
              }
              setSelectedConnectionAttribute('preset', value ?? '')
            }}
          />
          <Dropdown
            dropdownLabel="Stream Type"
            options={[
              { label: 'JPEG', value: 'jpeg' },
              { label: 'MJPEG', value: 'mjpeg' },
            ]}
            selectedValue={getSelectedConnectionAttribute('streamType')?.toLocaleUpperCase()}
            onSelect={(value) => {
              const preset = presets.find((p) => p.name === getSelectedConnectionAttribute('preset'));
              if (preset) {
                const url = value === 'mjpeg' ? preset.stream.mjpg : preset.stream.jpg;
                setSelectedConnectionAttribute('url', url ?? '');
              }
              setSelectedConnectionAttribute('streamType', value as 'jpeg' | 'mjpeg')
            }}
          />
          <InputField id="name" label="Name" placeholder="Camera Name" />
          <InputField id="ipAdress" label="IP-Address" placeholder="Address" />
          <InputField id="url" label="URL" placeholder="URL" />
          <InputField id="username" label="Username" placeholder="Username" />
          <InputField id="password" label="Password" placeholder="Password" type="password" />
          <ButtonGroup />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <h3>Viewer Settings</h3>
          <Dropdown dropdownLabel="Columns" options={[]} selectedValue="" onSelect={() => {}} />
        </div>
      </div>
      <ExportImport />
    </div>
  );
};
