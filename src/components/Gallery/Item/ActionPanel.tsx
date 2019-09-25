import React from 'react';
import { navigate } from '@reach/router';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

const StyledActionPanel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

interface ActionPanelButtonProps {
  danger?: boolean;
}
const ActionPanelButton = styled.button<ActionPanelButtonProps>`
  font-weight: 500;
  cursor: pointer;
  border: none;
  padding: 0.5rem 1rem;
  transition: background-color 100ms ease-in-out;
  color: #fff;

  background-color: ${({ theme }) => theme.secondary};
  :hover {
    background-color: ${({ theme }) => darken(0.2, theme.secondary)};
  }

  ${({ danger }) =>
    danger &&
    css`
      background-color: ${({ theme }) => theme.error};

      :hover {
        background-color: ${({ theme }) => darken(0.1, theme.error)};
      }
    `}
`;

interface Props {
  gridId: string;
  onDelete: () => void;
}

const ActionPanel: React.FC<Props> = ({ gridId, onDelete }) => {
  return (
    <StyledActionPanel>
      <ActionPanelButton danger onClick={onDelete}>
        Delete
      </ActionPanelButton>
      <ActionPanelButton onClick={() => navigate(`editor/${gridId}`)}>
        Edit
      </ActionPanelButton>
    </StyledActionPanel>
  );
};

export default ActionPanel;
