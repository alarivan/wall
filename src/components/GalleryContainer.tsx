import React, { useContext } from 'react';
import SimpleGrid from './SimpleGrid';
import styled from 'styled-components';
import { GalleryContext } from '../GalleryContext';
import { TGrid } from '../types';
import { deleteAction } from '../reducers/gallery/actions';
import { Link } from '@reach/router';

interface Props {}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GalleryContainer: React.FC<Props> = () => {
  const { state, dispatch } = useContext(GalleryContext);

  function handleDelete(grid: TGrid) {
    dispatch(deleteAction(grid));
  }

  return (
    <StyledContainer>
      {state.valueSeq().map(grid => (
        <div key={grid.meta.id}>
          <button onClick={() => handleDelete(grid)}>delete</button>
          <Link to={`editor/${grid.meta.id}`}>Edit</Link>

          <SimpleGrid grid={grid} preview={true} />
        </div>
      ))}
    </StyledContainer>
  );
};

export default GalleryContainer;
