import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-header.svg';
import {
  Container,
  Content,
  Navigation,
  Profile,
  StyledLink,
  Menu,
} from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <Navigation>
          <img src={logo} alt="Gympoint" title="Gympoint" />
          <ul>
            <li>
              <StyledLink to="/students">Alunos</StyledLink>
            </li>
            <li>
              <StyledLink to="/plans">Planos</StyledLink>
            </li>
            <li>
              <StyledLink to="/registrations">Matrículas</StyledLink>
            </li>
            <li>
              <StyledLink to="/help-orders">Pedidos de auxílio</StyledLink>
            </li>
          </ul>
        </Navigation>

        <Profile>
          <strong>Laura Beatris</strong>
          <Link to="/">Sair do sistema</Link>
        </Profile>
      </Content>

      {/* Burguer Menu for Mobile */}
      <Menu>
        <ul>
          <li>
            <StyledLink to="/students">Alunos</StyledLink>
          </li>
          <li>
            <StyledLink to="/plans">Planos</StyledLink>
          </li>
          <li>
            <StyledLink to="/registrations">Matrículas</StyledLink>
          </li>
          <li>
            <StyledLink to="/help-orders">Pedidos de auxílio</StyledLink>
          </li>
        </ul>
      </Menu>
    </Container>
  );
}
