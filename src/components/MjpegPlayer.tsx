import { useApi } from '../hook/useAPI';
import { Connection, useStore } from '../provider/StoreProvider';
import { onMount } from 'solid-js';

type MjpegPlayerProps = {
    connection?: Connection;
}

export const MjpegPlayer = (props: MjpegPlayerProps) => {

    const { getVideoUrl, updateMPEG } = useApi();
    const { getSelectedConnection } = useStore();

    onMount(() => {
        const currentConnection = props.connection ?? getSelectedConnection();
        if(!currentConnection) return;
        updateMPEG(
            currentConnection.url,
            currentConnection.username,
            currentConnection.password
        )
    })
    return (
        <video id="mpeg">
            <source src={getVideoUrl()} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};