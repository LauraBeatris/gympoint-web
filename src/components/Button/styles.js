import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;

  background: ${props => props.background};
  border-radius: 0.4rem;
  border: none;

  color: ${props => props.color};

  font-weight: bold;
  font-size: 1.4rem;
  padding: 0.9rem 1.4rem 0.9rem 1rem;

  text-align: right;
  text-transform: uppercase;
  transition: background 0.3s;

  svg {
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    margin-right: 1rem;
  }

  &:hover {
    background: ${props => darken(0.2, props.background)};
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;

  background: ${props => props.background};
  border-radius: 0.4rem;
  border: none;

  color: ${props => props.color};

  font-weight: bold;
  font-size: 1.4rem;
  padding: 0.9rem 1.4rem 0.9rem 1rem;

  text-align: right;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.3s;

  svg {
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    margin-right: 1rem;
  }

  &:hover {
    background: ${props => darken(0.2, props.background)};
  }
`;
