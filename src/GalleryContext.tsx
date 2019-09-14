import React, { Dispatch, useMemo } from 'react';
import { TGalleryState, TGalleryAction } from './reducers/gallery/types';
import {
  galleryReducer,
  initialGalleryState,
} from './reducers/gallery/reducer';
import { useGalleryPersistedReducer } from './hooks/useGalleryPersistedReducer';

type TGalleryContext = {
  state: TGalleryState;
  dispatch: Dispatch<TGalleryAction>;
};

export const GalleryContext = React.createContext<TGalleryContext>({
  state: initialGalleryState,
  dispatch: (() => 0) as React.Dispatch<TGalleryAction>,
});

export const GalleryProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useGalleryPersistedReducer(
    galleryReducer,
    initialGalleryState,
  );

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <GalleryContext.Provider value={contextValue}>
      {children}
    </GalleryContext.Provider>
  );
};
