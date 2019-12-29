import styled from 'styled-components';
import { fade } from '~/styles/animations';

export const Wrapper = styled.div`
  height: 100%;
  background: #f5f5f5;
`;

export const Content = styled.div`
  max-width: 130rem;
  margin: 0 auto;

  form {
    span {
      color: #de3b3b;
      font-weight: bold;
      animation: fade;
      animation: ${fade} 0.5s;
    }
  }
`;
