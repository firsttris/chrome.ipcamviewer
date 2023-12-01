import { useApi } from '../hook/useAPI';
import { Connection, useStore } from '../provider/StoreProvider';
import { onMount } from 'solid-js';

type JpegPlayerProps = {
    connection?: Connection;
}

export const JpegPlayer = (props: JpegPlayerProps) => {

    const { getImgUrl, updateJPEG} = useApi();
    const { getSelectedConnection } = useStore();

    onMount(() => {
        const currentConnection = props.connection ?? getSelectedConnection();
        if(!currentConnection) return;
        updateJPEG(
            currentConnection.url,
            currentConnection.username,
            currentConnection.password
        )
    })

    return (
        <img class="image" src={getImgUrl()}/>
    );
};