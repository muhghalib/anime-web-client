import type { Dispatch, SetStateAction } from 'react';
import { createContext, use } from 'react';

export const iframeContext = createContext<{
  iframe: {
    post: string;
    nume: string;
  };
  setIframe: Dispatch<SetStateAction<{ post: string; nume: string }>>;
}>({
  iframe: {
    post: '',
    nume: '',
  },
  setIframe: () => {},
});

export const useIframe = () => use(iframeContext);
