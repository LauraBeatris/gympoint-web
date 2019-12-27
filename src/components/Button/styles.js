import styled from 'styled-components';
import { darken } from 'polished';

export const StyledButton = styled.button`
  background: ${props => props.background};
  border-radius: 0.4rem;
  border: none;

  color: ${props => props.color};

  font-weight: bold;
  font-size: 1.4rem;
  padding: 1.1rem 1.4rem 1.1rem 4rem;

  text-align: right;
  text-transform: uppercase;
  transition: background 0.3s;

  &:hover {
    background: ${props => darken(0.2, props.background)};
  }
`;
