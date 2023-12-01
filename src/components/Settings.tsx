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

  const setUrlBasedOnStreamType = (presetName?: string, streamType?: string) => {
    const preset = presets.find((p) => p.name === presetName);
    if (preset) {
      const url = streamType === 'mjpeg' ? preset.stream.mjpg : preset.stream.jpg;
      setSelectedConnectionAttribute('url', url ?? '');
    }
  }

  const selectCameraPreset = (value?: string) => {
    setUrlBasedOnStreamType(value, getSelectedConnectionAttribute('streamType'));
    setSelectedConnectionAttribute('preset', value ?? '')
  }

  const selectStreamType = (value?: string) => {
    setUrlBasedOnStreamType(getSelectedConnectionAttribute('preset'), value);
    setSelectedConnectionAttribute('streamType', value as 'jpeg' | 'mjpeg')
  }

  return (
    <div class="container pt-3">
      <div class="row">
        <div class="col-12">
          <h3 class="mt-2 mb-2">Connections</h3>
          <Dropdown
            dropdownLabel="Connections"
            options={getConnectionNames()}
            selectedValue={getSelectedConnectionAttribute('name')}
            onSelect={(value) => setSelectedConnectionId(value ?? '')}
          />
          <Dropdown
            dropdownLabel="Camera Presets"
            options={getPresetNames}
            selectedValue={getSelectedConnectionAttribute('preset')}
            onSelect={selectCameraPreset}
          />
          <Dropdown
            dropdownLabel="Stream Type"
            options={[
              { label: 'JPEG', value: 'jpeg' },
              { label: 'MJPEG', value: 'mjpeg' },
            ]}
            selectedValue={getSelectedConnectionAttribute('streamType')?.toLocaleUpperCase()}
            onSelect={selectStreamType}
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
