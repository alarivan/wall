import React, { useContext } from 'react';
import SimpleGrid from './SimpleGrid';
import styled from 'styled-components';
import { GalleryContext } from '../GalleryContext';
import { TGrid } from '../types';
import { deleteAction } from '../reducers/gallery/actions';
import ActionPanel from './Gallery/Item/ActionPanel';

interface Props {}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const StyledGalleryItem = styled.div`
  margin-bottom: 1rem;
`;

const GalleryContainer: React.FC<Props> = () => {
  const { state, dispatch } = useContext(GalleryContext);

  function handleDelete(grid: TGrid) {
    dispatch(deleteAction(grid));
  }

  return (
    <StyledContainer>
      {state.valueSeq().map(grid => (
        <StyledGalleryItem key={grid.meta.id}>
          <ActionPanel
            gridId={grid.meta.id}
            onDelete={() => handleDelete(grid)}
          />
          <SimpleGrid grid={grid} preview={true} />
        </StyledGalleryItem>
      ))}
    </StyledContainer>
  );
};

export default GalleryContainer;
