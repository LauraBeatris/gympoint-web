import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0px 3rem;
  border-bottom: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 6.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  max-width: 144rem;
  margin: 0 auto;
`;

export const StyledLink = styled(NavLink).attrs({ activeClassName: 'visited' })`
  color: #999;
  text-transform: uppercase;
  font-weight: bold;
  transition: color 0.5s;

  &:hover {
    color: #444;
  }
`;

export const Navigation = styled.nav`
  display: inherit;
  align-items: center;

  img {
    padding-right: 3rem;
    border-right: 1px solid #ddd;

    @media (max-width: 102.4rem) {
      padding-right: 1.5rem;
    }
  }

  ul {
    display: inherit;
    align-items: center;
    list-style: none;

    @media (max-width: 1023px) {
      display: none;
    }

    li a {
      color: #999;
      text-transform: uppercase;
      font-weight: bold;
      transition: color 0.5s;

      &:hover,
      &.visited {
        color: #444;
      }
    }

    li + li {
      margin-left: 2rem;
    }

    li:first-child {
      margin-left: 3rem;
    }
  }
`;

export const Profile = styled.aside`
  text-align: right;

  strong {
    display: block;
    color: #666;
  }

  button {
    display: block;
    color: #de3b3b;
    margin-top: 0.25rem;
    text-transform: lowercase;
    transition: color 0.5s;
    border: none;
    background: inherit;

    &:hover {
      color: ${darken(0.2, '#de3b3b')};
    }
  }
`;

export const Menu = styled(Navigation)`
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1024px) {
    display: none;
  }

  ul {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    li:first-child {
      margin-left: 0;
    }

    li {
      width: 100%;
      text-align: center;
    }

    li + li {
      margin-left: 1rem;
    }

    padding: 1rem 0rem;
  }
`;
