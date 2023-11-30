import { createSignal } from 'solid-js';

type Props = {
  id: string,
  label: string,
  placeholder: string,
  type?: string
};

export const InputField = (props: Props) => {
  const [value, setValue] = createSignal('');

  return (
    <div class="form-group row mt-2">
      <label for={props.id} class="col-3 col-form-label">{props.label} *</label>
      <div class="col-9">
        <input class="form-control" type={props.type || 'text'} placeholder={props.placeholder} id={props.id} value={value()} onChange={(e: Event) => setValue((e.target as HTMLInputElement).value)}/>
      </div>
    </div>
  );
};