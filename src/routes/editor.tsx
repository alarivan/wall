import React, { useContext, useReducer, useEffect } from 'react';
import Container from '../components/Container';
import { RouteComponentProps } from '@reach/router';
import { GalleryContext } from '../GalleryContext';
import { TGalleryState } from '../reducers/gallery/types';
import { initState } from '../reducers/editor/utils';
import { initialState, gridReducer } from '../reducers/editor/reducer';
import { setStateAction } from '../reducers/editor/actions';

interface Props extends RouteComponentProps {
  id?: string;
}

function _getGrid(id: string | undefined, state: TGalleryState) {
  const grid = id ? state.get(id) : undefined;

  return grid ? initState(grid) : initialState;
}

const Editor: React.FC<Props> = ({ id }) => {
  const { state: galleryState } = useContext(GalleryContext);
  const [state, dispatch] = useReducer(gridReducer, _getGrid(id, galleryState));

  useEffect(() => {
    dispatch(setStateAction(_getGrid(id, galleryState)));
  }, [id, galleryState]);

  return <Container state={state} dispatch={dispatch} />;
};

export default Editor;
