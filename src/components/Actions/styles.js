import styled from 'styled-components';

export const Container = styled.div`
  padding: 2.5rem 0rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 102.4rem) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  color: #444444;
  font-weight: bold;

  @media (max-width: 102.4rem) {
    margin: 1rem 0rem;
  }
`;

export const ActionsContainer = styled.div`
  display: inherit;
  align-items: center;

  button,
  a {
    & + input,
    & + div input,
    & + button,
    & + button {
      margin-left: 2rem;

      @media (max-width: 102.4rem) {
        margin: 1.5rem 0rem;
      }
    }
  }

  @media (max-width: 102.4rem) {
    flex-direction: column;
    justify-content: center;
  }
`;
