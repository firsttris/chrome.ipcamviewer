import { createContext, createSignal, useContext } from 'solid-js';
import type { JSX } from 'solid-js';

type StoreProviderProps = {
  children: JSX.Element,
};

type ContextType = {
  updateJPEG: (url: string, username: string, password: string) => Promise<void>,
  updateMPEG: (url: string, username: string, password: string) => Promise<void>,
  getVideoUrl: () => string | undefined,
  getImgUrl: () => string | undefined,
};

const ApiContext = createContext<ContextType>();

export const ApiProvider = (props: StoreProviderProps) => {
  const [getVideoUrl, setVideoUrl] = createSignal<string | undefined>(undefined);
  const [getImgUrl, setImgUrl] = createSignal<string | undefined>(undefined);

  const fetchStream = async (url: string, username: string, password: string) => {
    const credentials = btoa(`${username}:${password}`);
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${btoa(credentials)}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error(`Failed to fetch stream: ${response.statusText}`);
      return;
    }

    const reader = response.body ? response.body.getReader() : null;
    if (!reader) {
      console.error('Response body is null');
      return;
    }
    const stream = new ReadableStream({
      start: async (controller) => {
        const pump = async () => {
          const { value, done } = await reader.read();
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          await pump();
        };
        pump().catch((error) => {
          console.error(`Error reading stream: ${error}`);
          controller.error(error);
        });
      },
    });

    if (!stream) {
      console.error('Stream is undefined');
      return;
    }

    const data = await reader.read();
    if (!data.value) {
      console.error('No data in stream');
      return;
    }

    return data.value.buffer;
  };

  const updateJPEG = async (url: string, username: string, password: string) => {
    const buffer = await fetchStream(url, username, password);

    if (!buffer) {
      return;
    }

    const blob = new Blob([buffer], { type: 'image/jpeg' });

    setImgUrl(URL.createObjectURL(blob));

    // this should happen in the component
    //const imgElement = document.createElement('img');
    //imgElement.src = imgUrl;
  };

  const updateMPEG = async (url: string, username: string, password: string) => {
    const buffer = await fetchStream(url, username, password);

    if (!buffer) {
      return;
    }

    const blob = new Blob([buffer], { type: 'video/mp4' });
    URL.createObjectURL(blob);
    setVideoUrl(URL.createObjectURL(blob));

    // this should happen in the component
    //const sourceElement = document.createElement('source');
    //sourceElement.src = videoUrl;
    //sourceElement.type = 'video/mp4';
  };

  return (
    <ApiContext.Provider value={{ updateMPEG, updateJPEG, getVideoUrl, getImgUrl }}>
      {props.children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within a ApiProvider');
  }
  return context;
};
