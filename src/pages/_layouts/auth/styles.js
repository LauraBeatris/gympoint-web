import styled from 'styled-components';
import { darken } from 'polished';
import { fade } from '~/styles/animations';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 4.5rem 3rem;
  margin: 1rem;

  width: 100%;
  height: 100%;

  max-width: 36rem;
  max-height: 44.8rem;
  background: #fff;
  border-radius: 0.4rem;

  form {
    div.input-container {
      display: flex;
      flex-direction: column;
    }

    label {
      color: #444;
      font-weight: bold;
      text-transform: uppercase;
      margin: 2rem 0rem 1rem;
    }

    input,
    button {
      font-size: 1.6rem;
      border-radius: 0.4rem;
    }

    input {
      border: 0.1rem solid #ddd;
      height: 4.4rem;
      padding: 0rem 1.5rem;

      &::placeholder {
        color: #999;
      }
    }

    button {
      color: #fff;
      font-weight: bold;

      background: #ee4d64;
      border: none;
      padding: 1.3rem 0rem;
      width: 100%;
      margin-top: 2rem;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#ee4d64')};
      }
    }

    span {
      margin-top: 1rem;
      color: #de3b3b;
      font-weight: bold;
      animation: fade;
      animation: ${fade} 0.5s;
    }
  }
`;
