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

    li:first-child {
      margin: 0rem 0rem 0 2rem;
    }

    li:not(:last-child) a {
      margin: 0rem 1.5rem 0rem 0rem;
    }
  }
`;

export const Profile = styled.aside`
  text-align: right;

  strong {
    display: block;
    color: #666;
  }

  a {
    display: block;
    color: #de3b3b;
    margin-top: 0.25rem;
    text-transform: lowercase;
    transition: color 0.5s;

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

    li a {
      margin: 0rem 1.5rem 0rem 0rem;
      text-align: center;
    }

    padding: 1rem 0rem;
  }
`;
