
import { createSignal, For } from 'solid-js';

type Option = {
  label: string
  value: string
}

type DropDownProps = {
  dropdownLabel: string
  options: Option[]
  selectedValue: string
  onSelect: (value: string | null) => void
}

export const Dropdown = (props: DropDownProps) => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div class="form-group row mt-2">
      <label for="url" class="col-3 col-form-label">{props.dropdownLabel}</label>
      <div class="col-9">
        <div class="dropdown d-inline-block">
          <button
            class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
            onClick={() => setIsOpen(!isOpen())}
          >
            {props.selectedValue}
          </button>
          <div
            aria-labelledby="dropdownMenuButton"
            class="dropdown-menu mt-1 user-select-none"
            classList={{ 'd-block': isOpen() }}
          >
            <a class="dropdown-item" onClick={() => props.onSelect(null)}>
              None
            </a>
            <For each={props.options}>
              {(option) => (
                <a class="dropdown-item"

                  onClick={() => props.onSelect(option.value)}
                >
                  {option.label}
                </a>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};