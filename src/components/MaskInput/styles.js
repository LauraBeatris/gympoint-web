import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const StyledInput = styled(InputMask)`
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  background: ${props => props.background};

  color: #999;
  font-size: 1.4rem;

  padding: 1.1rem 1.4rem 1.1rem 1rem;

  &::placeholder {
    color: #999999;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  input {
    padding: 1.1rem 1.4rem 1.1rem 4rem;
  }

  svg {
    position: absolute;
    color: #999;
    width: 20px;
    height: 20px;

    left: 3rem;

    @media (max-width: 102.4rem) {
      left: 1rem;
    }
  }

  input {
    width: 100%;
  }
`;
