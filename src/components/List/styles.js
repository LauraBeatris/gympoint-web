import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 0rem 1.2rem;

  @media (max-width: 102.4rem) {
    padding: 0rem 0.3rem;
  }

  p.loading {
    font-size: 2rem;
    font-weight: bold;
    color: #444;
  }
`;

export const StyledTable = styled.table`
  border: none;
  background: #fff;
  width: 100%;

  thead th {
    padding: 1.5rem 0rem;

    @media (max-width: 102.4rem) {
      padding-right: 0.25rem;
    }
  }

  thead th,
  tbody td {
    font-size: 1.6rem;
  }

  th {
    color: #444444;
    font-weight: bold;
    text-transform: uppercase;
    text-align: left;
  }

  td {
    color: #666666;
  }

  .center {
    text-align: center;
  }

  td.actions {
    display: flex;
    justify-content: center;

    @media (max-width: 102.4rem) {
      flex-direction: column;
    }

    a {
      text-decoration: none;
    }

    button,
    a {
      background: none;
      border: none;
      text-transform: lowercase;
      font-size: 1.5rem;

      transition: color 0.5s;

      &.blue {
        color: #4d85ee;
        &:hover {
          color: ${darken(0.3, '#4d85ee')};
        }
      }

      &.red {
        color: #de3b3b;

        &:hover {
          color: ${darken(0.3, '#de3b3b')};
        }
      }

      & + button {
        margin-left: 1.5rem;

        @media (max-width: 102.4rem) {
          margin-left: 0rem;
        }
      }
    }
  }

  tbody td.edit,
  tbody td.remove {
    text-transform: lowercase;
  }

  tbody tr {
    & + tr td {
      padding-top: 2.5rem;
    }
  }
`;
