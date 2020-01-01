import styled from 'styled-components';
import { darken } from 'polished';
import { Form, Input } from '@rocketseat/unform';

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

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  button {
    flex: 1;
    background: #ee4d64;
    border: none;
    border-radius: 0.4rem;

    font-size: 1.6rem;
    font-weight: bold;
    color: #fff;

    margin-top: 2rem;
    padding: 1rem 2rem;

    transition: background 0.3s;

    &:hover {
      background: ${darken(0.2, '#ee4d64')};
    }
  }

  h2 {
    color: #444444;
    font-weight: bold;
    font-size: 1.4rem;
    text-transform: uppercase;
    margin: 0.8rem 0rem;
  }

  p {
    color: #666666;
    font-size: 1.6rem;
    text-align: left;
    margin-bottom: 1rem;
  }

  textarea {
    resize: none;
    color: #666666;
    font-size: 1.4rem;
  }
`;

export const TextArea = styled(Input)``;
