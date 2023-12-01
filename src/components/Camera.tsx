import { Connection, useStore } from '../provider/StoreProvider';
import './Camera.css'
import { Match, Switch } from 'solid-js';
import { JpegPlayer } from './JpegPlayer';
import { MjpegPlayer } from './MjpegPlayer';

type CameraProps = {
    connection?: Connection;
}

export const Camera = (props: CameraProps) => {

    const { getSelectedConnection } = useStore();
    const streamType = () => {
        return props.connection?.streamType ?? getSelectedConnection()?.streamType;
    }

    return (
        <Switch fallback={<div>Not Found</div>}>
            <Match when={streamType() === 'jpeg'}>
                <JpegPlayer connection={props.connection} />

            </Match>
            <Match when={streamType() === 'mjpeg'}>
                <MjpegPlayer connection={props.connection} />
            </Match>
        </Switch>
    );
};