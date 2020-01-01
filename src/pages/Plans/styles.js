import styled from 'styled-components';
import { Form } from '@rocketseat/unform';
import CurrencyFormat from 'react-currency-format';

export const Container = styled.div`
  & > p {
    color: #444;
    font-size: 1.6rem;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;

  .rc-pagination {
    align-self: center;
    margin: 30px 0px;

    .rc-pagination-item-active {
      background-color: #ee4d64;
      border-color: #ee4d64;
    }
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 2rem;

  div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.5rem;

    > div {
      display: flex;
      flex-direction: column;
    }
  }

  input {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 102.4rem) {
    div {
      display: flex;
      flex-direction: column;
    }

    padding: 0rem 0.5rem;
  }
`;

export const Currency = styled(CurrencyFormat)`
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
