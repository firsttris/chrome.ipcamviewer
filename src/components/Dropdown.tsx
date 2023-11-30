
import { createEffect, createSignal, For, onCleanup } from 'solid-js';

type Option = {
  label: string
  value: string
}

type DropDownProps = {
  dropdownLabel: string
  options: Option[]
  selectedValue: string
  onSelect: (value?: string) => void
}

export const Dropdown = (props: DropDownProps) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const closeDropdown = (event: Event) => {
    if ((event.target as HTMLElement).closest('.dropdown') === null) {
      setIsOpen(false);
    }
  };

  createEffect(() => {
    if (isOpen()) {
      document.addEventListener('click', closeDropdown);
    } else {
      document.removeEventListener('click', closeDropdown);
    }
  });

  onCleanup(() => document.removeEventListener('click', closeDropdown));

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
          <div style={{ "max-height": '80vh', "overflow-y": 'auto' }}
            aria-labelledby="dropdownMenuButton"
            class="dropdown-menu mt-1 user-select-none"
            classList={{ 'd-block': isOpen() }}
          >
            <a class="dropdown-item" onClick={() => {
              props.onSelect()
              setIsOpen(false)
            }}>
              None
            </a>
            <For each={props.options}>
              {(option) => (
                <a class="dropdown-item"

                  onClick={() => {
                    props.onSelect(option.value)
                    setIsOpen(false)
                  }}
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