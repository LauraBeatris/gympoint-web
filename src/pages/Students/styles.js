import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  & > p {
    color: #444;
    font-size: 1.6rem;
    margin: 14px 0px;
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
