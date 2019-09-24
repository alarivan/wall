import React from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';

const StyledActionPanel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const StyledActionPanelButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 0.5rem 1rem;
  transition: background-color 100ms ease-in-out;
`;

const StyledActionPanelButtonDelete = styled(StyledActionPanelButton)`
  background-color: ${({ theme }) => theme.error};
`;

interface Props {
  gridId: string;
  onDelete: () => void;
}

const ActionPanel: React.FC<Props> = ({ gridId, onDelete }) => {
  return (
    <StyledActionPanel>
      <StyledActionPanelButtonDelete onClick={onDelete}>
        Delete
      </StyledActionPanelButtonDelete>
      <StyledActionPanelButton
        onClick={() => navigate(`editor/${gridId}`)}
      >
        Edit
      </StyledActionPanelButton>
    </StyledActionPanel>
  );
};

export default ActionPanel;
