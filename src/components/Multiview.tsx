import { For, Show } from "solid-js";
import { Camera } from "./Camera";
import { useStore } from "../provider/StoreProvider";


export const Multiview = () => {

    const { getConnections, getSelectedConnection } = useStore();

    const openSettings = () => {
        // Implement your settings logic here
    };

    const isConnectionEmpty = () => getConnections().length <= 1 && getSelectedConnection()?.ipAdress === '' || getSelectedConnection()?.username === '';

    return (
        <div class="multiview container-fluid">
            <Show when={isConnectionEmpty()}>
                <div class="warnings">
                    <br />
                    <h1>{"No Cameras"}</h1>
                    <br />
                    <button type="button" class="btn btn-secondary" onClick={openSettings}>
                        Setup Connections
                    </button>
                </div>
            </Show>
            <Show when={!isConnectionEmpty()}>
                <For each={getConnections()}>
                    {(connection) => (
                        <div class="row flex">
                            <div class="col-12">
                                <Camera connection={connection}
                                />
                            </div>
                        </div>
                    )}
                </For>
            </Show>
        </div>
    );
};