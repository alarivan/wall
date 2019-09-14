import React, { useContext, useReducer } from 'react';
import Container from '../components/Container';
import { RouteComponentProps } from '@reach/router';
import { GalleryContext } from '../GalleryContext';
import { gridReducer, initState, initialState } from '../reducers/gridReducer';

interface Props extends RouteComponentProps {
  id?: string;
}

const Editor: React.FC<Props> = ({ id }) => {
  const { state: galleryState } = useContext(GalleryContext);
  const grid = id ? galleryState.get(id) : null;
  const [state, dispatch] = useReducer(
    gridReducer,
    grid ? initState(grid) : initialState,
  );

  return <Container state={state} dispatch={dispatch} />;
};

export default Editor;
