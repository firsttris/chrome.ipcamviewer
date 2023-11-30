import { Connection, useStore } from '../provider/StoreProvider';

type Props = {
  id: keyof Connection,
  label: string,
  placeholder: string,
  type?: string,
};

export const InputField = (props: Props) => {
  const { getSelectedConnectionAttribute, setSelectedConnectionAttribute } = useStore();

  return (
    <div class="form-group row mt-2">
      <label for={props.id} class="col-3 col-form-label">
        {props.label} *
      </label>
      <div class="col-9">
        <input
          class="form-control"
          type={props.type || 'text'}
          placeholder={props.placeholder}
          id={props.id}
          value={getSelectedConnectionAttribute(props.id)}
          onChange={(e: Event) =>
            setSelectedConnectionAttribute(props.id, (e.target as HTMLInputElement).value)
          }
        />
      </div>
    </div>
  );
};
