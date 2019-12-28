import styled from 'styled-components';
import { Input } from '@rocketseat/unform';

export const StyledInput = styled(Input)`
  border: 1px solid #ddd;
  border-radius: 0.4rem;

  color: #999;
  font-size: 1.4rem;

  padding: 1.1rem 1.4rem 1.1rem 4rem;

  &::placeholder {
    color: #999999;
  }
`;

export const InputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    font-size: 2rem;
    color: #999;
    top: 25%;
    left: 3.5rem;
  }
`;
