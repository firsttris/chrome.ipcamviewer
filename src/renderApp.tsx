import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { render } from 'solid-js/web';
import { StoreProvider } from './provider/StoreProvider';
import type { JSX } from 'solid-js';

interface ProviderWrapperProps {
    children: JSX.Element;
}

const ProviderWrapper = (props: ProviderWrapperProps) => (
    <StoreProvider>
        {props.children}
    </StoreProvider>
);

export const renderApp = (Component: () => JSX.Element) => {
    const element = document.getElementById('root');
    render(() => <ProviderWrapper><Component /></ProviderWrapper>, element!);
}