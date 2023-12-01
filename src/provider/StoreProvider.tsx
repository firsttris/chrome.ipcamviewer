import {
  createContext,
  useContext,
  createSignal,
  createMemo,
  onMount,
  createEffect,
} from 'solid-js';
import type { JSX } from 'solid-js';


export type Connection = {
  id: string,
  name: string,
  ipAdress: string,
  url: string,
  username: string,
  password: string,
  streamType: 'mjpeg' | 'jpeg' | '',
  preset: string,
};

export const emptyNewConnection: Connection = {
  id: '',
  name: '',
  ipAdress: '',
  url: '',
  username: '',
  password: '',
  streamType: '',
  preset: '',
};

type Store = {
  getConnections: () => Connection[],
  setConnections: (connections: Connection[]) => void,
  getSelectedConnection: () => Connection | undefined,
  createNewConnection: () => void,
  deleteConnection: () => void,
  setSelectedConnectionAttribute: (attribute: keyof Connection, value: string) => void,
  getSelectedConnectionAttribute: (attribute: keyof Connection) => string,
  getConnectionNames: () => { label: string, value: string }[],
  setSelectedConnectionId: (id: string) => void,
};

const StoreContext = createContext<Store>();

type StoreProviderProps = {
  children: JSX.Element,
};

export const StoreProvider = (props: StoreProviderProps) => {
  const [getConnections, setConnections] = createSignal<Connection[]>([]);
  const [getSelectedConnectionId, setSelectedConnectionId] = createSignal<string | undefined>(
    undefined,
  );

  const getSelectedConnection = createMemo(() =>
    getConnections().find((c) => c.id === getSelectedConnectionId()),
  );

  const getConnectionNames = createMemo(() =>
    getConnections().map((c) => ({ label: c.name, value: c.id })),
  );

  const createNewConnection = () => {
    const connections = getConnections();
    const id = new Date().getTime().toString();
    const newConnection = { ...emptyNewConnection, id, name: `New ${connections.length + 1}` };
    setConnections([...connections, newConnection]);
    setSelectedConnectionId(newConnection.id);
  };

  const deleteConnection = () => {
    const id = getSelectedConnectionId();
    if (id) {
      const newConnections = getConnections().filter((c) => c.id !== id);
      setConnections(newConnections);
    }
  };

  const setSelectedConnectionAttribute = (attribute: keyof Connection, value: string) => {
    const id = getSelectedConnectionId();
    if (id) {
      const newConnections = getConnections().map((c) =>
        c.id === id ? { ...c, [attribute]: value } : c,
      );
      setConnections(newConnections);
    }
  };

  const getSelectedConnectionAttribute = (attribute: keyof Connection) => {
    const selectedConnection = getSelectedConnection();
    return selectedConnection ? selectedConnection[attribute] : '';
  };

  onMount(async () => {
    if (!chrome?.storage) {
      if (getConnections().length === 0) {
        createNewConnection();
      }
      return;
    }

    const result = await chrome.storage.sync.get(['connections', 'selectedConnectionId']);

    if (result?.connections?.length > 0) {
      setConnections(result.connections);
    } else {
      createNewConnection();
    }

    if (result?.selectedConnectionId) {
      setSelectedConnectionId(result.selectedConnectionId);
    }
  });

  createEffect(() => {
    if (!chrome?.storage) {
      return;
    }

    const connections = getConnections();
    if (connections.length > 0) {
      chrome.storage.sync.set({ connections });
    }

    const selectedConnectionId = getSelectedConnectionId();
    if (selectedConnectionId) {
      chrome.storage.sync.set({ selectedConnectionId });
    }
  });

  return (
    <StoreContext.Provider
      value={{
        getConnections,
        setConnections,
        getSelectedConnection,
        createNewConnection,
        deleteConnection,
        setSelectedConnectionAttribute,
        getSelectedConnectionAttribute,
        getConnectionNames,
        setSelectedConnectionId
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
